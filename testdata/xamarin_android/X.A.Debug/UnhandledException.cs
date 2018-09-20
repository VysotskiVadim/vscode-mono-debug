
using System.Diagnostics;

namespace X.A.Debug
{
    public static class UnhandledException 
    {        
        public static void throwUnhandledException() {
            throw new System.Exception("test message");
        }
    }
}

