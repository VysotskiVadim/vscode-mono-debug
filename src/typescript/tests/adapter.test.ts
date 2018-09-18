/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

"use strict";

import assert = require('assert');
import * as Path from 'path';
import * as fs from 'fs';
import {DebugClient} from 'vscode-debugadapter-testsupport';

suite('Xamarin Debug Adapter', () => {

	const PROJECT_ROOT = Path.join(__dirname, '../../');
	const DATA_ROOT = Path.join(PROJECT_ROOT, 'testdata/');
	const DEBUG_ADAPTER = Path.join(PROJECT_ROOT, 'bin/Release/mono-debug.exe');

	let dc: DebugClient;

	setup( () => {
		dc = new DebugClient('mono', DEBUG_ADAPTER, 'xamarin');
		let timeOut = Number(process.env.xamarin_debug_adapter_test_timeout);
		if (!isNaN(timeOut)) {
			dc.defaultTimeout = timeOut;
		}
		return dc.start();
	});

	teardown(function() {
		let testFailed = this.currentTest.state != "passed";
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
		})
		.then(() => {
			return dc.stop();
		});
	});

	suite('debug android', () => {

		const PACKAGE = 'com.xamarin.debugexample.x_a_debug';
		const XAMARIN_ANDROID_TEST_ROOT = Path.join(DATA_ROOT, 'xamarin_android', 'X.A.Debug');
		
		test('steps flow', () => {
			const STEP_TEST_FUNCTION_DEFINITION_LINE = 8;
			const CALL_OF_INNER_FUNCTION_LINE = 9;
			const INNER_FUNCTION_DEFINITION_LINE = 12;
			const LAST_LINE_OF_STEP_TEST_FUNCTION = 10;
			const SOURCE = Path.join(XAMARIN_ANDROID_TEST_ROOT, 'StepsFlow.cs');
			return dc
				.hitBreakpoint({ packageName: PACKAGE }, { path: SOURCE, line: STEP_TEST_FUNCTION_DEFINITION_LINE } )
				.then(() => Promise.all([
					dc.assertStoppedLocation('step', { path: SOURCE, line: CALL_OF_INNER_FUNCTION_LINE}),
					dc.nextRequest(null)
				]))
				.then(() => Promise.all([
					dc.assertStoppedLocation('step', { path: SOURCE, line: INNER_FUNCTION_DEFINITION_LINE}),
					dc.stepInRequest(null)
				]))
				.then(() => Promise.all([
					dc.assertStoppedLocation('step', { path: SOURCE, line: CALL_OF_INNER_FUNCTION_LINE }),
					dc.stepOutRequest(null)
				]))
				.then(() => dc.setBreakpointsRequest({ lines: [LAST_LINE_OF_STEP_TEST_FUNCTION], breakpoints: [{ line: LAST_LINE_OF_STEP_TEST_FUNCTION }], source: { path: SOURCE } } ))
				.then(() => Promise.all([
					dc.assertStoppedLocation('breakpoint', { path: SOURCE, line: LAST_LINE_OF_STEP_TEST_FUNCTION }),
					dc.continueRequest(null)
				]));
		});

		test('variables flow', () => {
			const SOURCE = Path.join(XAMARIN_ANDROID_TEST_ROOT, 'Variables.cs');
			const TEST_FUNCTION_LAST_LINE = 13;

			return Promise.all([
				dc.waitForEvent('initialized').then(event => {
					return dc.setBreakpointsRequest({
						lines: [TEST_FUNCTION_LAST_LINE],
						breakpoints: [{ line: TEST_FUNCTION_LAST_LINE }],
						source: { path: SOURCE }
					});
				}),
				dc.launch({ packageName: PACKAGE }),
				dc.waitForEvent('stopped')
					.then(event => dc.stackTraceRequest({ threadId: event.body.threadId}))
					.then(stackTraceResponse => dc.scopesRequest({ frameId: stackTraceResponse.body.stackFrames[0].id }))
					.then(scopeResponse => dc.variablesRequest({ variablesReference: scopeResponse.body.scopes[0].variablesReference }))
					.then(variablesResponse => {
						let variables = variablesResponse.body.variables;
						assert.equal(variables.some(el => el.name == 'localIntVariable' && el.type == 'int' && el.value == '3'), true);
						assert.equal(variables.some(el => el.name == 'localArrayVariable' && el.type == 'int[]'), true);
						assert.equal(variables.some(el => el.name == 'this'), true);
						var thisVariable = variables.filter(el => el.name == 'this')[0];
						return dc.variablesRequest({ variablesReference: thisVariable.variablesReference });
					})
					.then(variablesResponse => {
						let variables = variablesResponse.body.variables;
						assert.equal(variables.some(el => el.name == 'testFieldString' && el.type == 'string' && el.value == '"test_string_value"'), true);						
					})
			]);
		});
	});

});