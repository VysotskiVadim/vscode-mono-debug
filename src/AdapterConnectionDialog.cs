using System;
using Mono.Debugging.Client;

namespace VSCodeDebug {

    public class AdapterConnectionDialog : IConnectionDialog
    {

        private readonly Action _onDialogClosed;

        public AdapterConnectionDialog(Action onDialogClosed)
        {
            _onDialogClosed = onDialogClosed;
        }

        public event EventHandler UserCancelled;

        public void Dispose()
        {
            _onDialogClosed?.Invoke();
        }

        public void SetMessage(DebuggerStartInfo dsi, string message, bool listening, int attemptNumber)
        {
        }
    }

}