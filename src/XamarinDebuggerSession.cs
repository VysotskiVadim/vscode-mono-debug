using System;
using Mono.Debugging.Soft;

namespace VSCodeDebug {
	class XamarinDebuggerSession : SoftDebuggerSession {
		protected override bool ShouldRetryConnection (Exception ex, int attemptNumber)
		{
			return true;
		}
	}

}