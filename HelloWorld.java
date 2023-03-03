
class HelloWorld
{
    // Your program begins with a call to main().
    // Prints "Hello, World" to the terminal window.
    public static void main(String args[])
    {
        System.out.println( HelloWorld.gtc(3,15) );
    }


    public static int gtc(int  p ,int q ){
            
        if( q == 0) return p ;

        int r = p % q;

        return gtc(q,r );


    }
}


