import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    // بررسی اگر درخواست برای تصویر است
    const isImageRequest = /\.(jpe?g|png|gif|svg|webp|ico|bmp)$/i.test(pathname);

    // اگر درخواست تصویر است که با پیشوند زبان شروع می‌شود
    if (isImageRequest && /^\/(fa|en|ar)\/images\//.test(pathname)) {
        // مسیر اصلی تصویر را استخراج کنید (حذف پیشوند زبان)
        const actualImagePath = pathname.replace(/^\/(fa|en|ar)/, '');
        // بازنویسی به مسیر اصلی
        return NextResponse.rewrite(new URL(actualImagePath, request.url));
    }

    // منطق روتینگ زبان (همان کد قبلی شما)
    if (pathname === '' || pathname === '/') {
        return NextResponse.redirect(new URL('/fa', url));
    }

    const pathnameHasLocale = ['fa', 'en', 'ar'].some(
        locale => pathname.startsWith(`/${locale}`)
    );

    if (!pathnameHasLocale &&
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/api') &&
        !pathname.includes('/favicon.ico')) {
        return NextResponse.redirect(new URL(`/fa${pathname}`, url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
