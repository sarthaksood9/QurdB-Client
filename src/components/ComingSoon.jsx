import React from 'react';

function ComingSoon() {
  return (
    <div className="flex min-h-[100dvh] mt-[-7%] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-slide-up">Coming soon!</h1>
        
        <p className="mt-4 text-muted-foreground animate-slide-up delay-100">
        Our comprehensive statistics section is coming soon!<br/>
          Stay tuned for updates and detailed insights.
        </p>
      </div>
    </div>
  );
}

export default ComingSoon;