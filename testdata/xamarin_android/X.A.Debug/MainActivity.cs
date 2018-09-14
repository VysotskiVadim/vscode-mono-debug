using Android.App;
using Android.Widget;
using Android.OS;
using System.Diagnostics;

namespace X.A.Debug
{
    [Activity(Label = "X.A. Debug", MainLauncher = true)]
    public class MainActivity : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            
            var a = 15;
            var b = a + 2;
        }
    }
}

