
using System.Diagnostics;

namespace X.A.Debug
{
    public static class StepsFlow 
    {        
        public static void StepTestFunction() {
            InnerStepsTestFunction();
        }

        private static void InnerStepsTestFunction() {
        }
    }
}

