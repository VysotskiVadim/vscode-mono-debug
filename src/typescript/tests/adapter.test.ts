/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

"use strict";

import assert = require('assert');
import * as Path from 'path';
import * as fs from 'fs';
import {DebugClient} from 'vscode-debugadapter-testsupport';
import {DebugProtocol} from 'vscode-debugprotocol';

suite('Node Debug Adapter', () => {

	const PROJECT_ROOT = Path.join(__dirname, '../../');
	const DATA_ROOT = Path.join(PROJECT_ROOT, 'testdata/');

	const DEBUG_ADAPTER = Path.join(PROJECT_ROOT, 'mono-debug-proxy.sh');


	let dc: DebugClient;

	setup( () => {
		dc = new DebugClient('/bin/sh', DEBUG_ADAPTER, 'mono');
		dc.defaultTimeout = 58000;
		return dc.start();
	});

	teardown(function() {
		let testFailed = this.currentTest.state != "passed";
		return new Promise((resolve, reject) => {
			if (testFailed) {
				fs.readFile(Path.join(PROJECT_ROOT, 'proxy_log'), 'utf8', (err, data) => {
					console.log('proxyLog:');
					console.log(data)
					resolve();
				});
			}
			else {
				resolve();
			}
		})
		.then(() => {
			return new Promise((resolve, reject) => {
				if (testFailed) {
					fs.readFile(Path.join(PROJECT_ROOT, 'xamarin-debug-log'), 'utf8', (err, data) => {
						console.log('xamarin-debug-log:');
						console.log(data)
						resolve();
					});
				}
				else {
					resolve();
				}
			});
		})
		.then(() => {
			return dc.stop();
		});
	});

	suite('setBreakpoints android', () => {

		const PROGRAM = 'com.xamarin.debugexample.x_a_debug';
		const SOURCE = Path.join(DATA_ROOT, 'xamarin_android/X.A.Debug/MainActivity.cs');
		const BREAKPOINT_LINE = 16;

		test('should stop on a breakpoint', () => {
			return dc.hitBreakpoint({ packageName: PROGRAM }, { path: SOURCE, line: BREAKPOINT_LINE } );
		});
	});

});