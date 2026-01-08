'use client';

import * as React from 'react';
import Link from 'next/link';
import '@/lib/env';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h1 className='mt-4 text-4xl md:text-6xl'>
            Commission Calculator
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            Calculate your transaction fees based on your merchant tier and payment method
          </p>
          <div className='mt-6'>
            <Link href='/calculator' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Go to Calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
