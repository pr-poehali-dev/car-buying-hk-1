import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import CanonicalTag from "@/components/CanonicalTag";
import NotFound from "@/pages/NotFound";
import {SITE_JSON_LD} from "@/lib/site-jsonld";
import appCss from "@/index.css?url";

const TITLE = "Выкуп авто Хабаровск - Срочный выкуп автомобилей за 15 минут | +7(984)177-15-88";
const DESCRIPTION =
    "Срочный выкуп автомобилей в Хабаровске и крае за 15 минут. Битые, кредитные, без документов. Деньги сразу. Бесплатный выезд оценщика. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88";
const OG_TITLE = "Выкуп авто Хабаровск - Срочный выкуп автомобилей за 15 минут";
const OG_DESCRIPTION = "Срочный выкуп автомобилей в Хабаровске. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐";
const OG_IMAGE = "https://cdn.poehali.dev/projects/67e7cf58-b4b6-432f-8bfa-54cde7992932/files/a831bee9-327c-4fa9-b47b-a42be3b0cde0.jpg";

const TOP_MAIL_RU = `var _tmr = window._tmr || (window._tmr = []);
_tmr.push({id: "3804920", type: "pageView", start: (new Date()).getTime()});
(function (d, w, id) {
  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "tmr-code");`;

const YANDEX_METRIKA = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104279599', 'ym');
ym(104279599, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`;

const YANDEX_DIRECT_PIXEL = `(function(w, d, n, s, t) {
    w[n] = w[n] || [];
    w[n].push(function() {});
    t = d.getElementsByTagName("script")[0];
    s = d.createElement("script");
    s.type = "text/javascript";
    s.src = "https://mc.yandex.ru/metrika/tag.js";
    s.async = true;
    t.parentNode.insertBefore(s, t);
})(window, document, "yandex_metrika_callbacks");`;

const VK_PIXEL = `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("YOUR_VK_PIXEL_ID"),VK.Retargeting.Hit()},document.head.appendChild(t)}();`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"},
            {name: "format-detection", content: "telephone=yes"},
            {name: "mobile-web-app-capable", content: "yes"},
            {name: "apple-mobile-web-app-capable", content: "yes"},
            {name: "apple-mobile-web-app-status-bar-style", content: "default"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {name: "keywords", content: "выкуп авто хабаровск, срочный выкуп автомобилей, выкуп битых авто, выкуп авто в кредите, продать машину хабаровск, автовыкуп"},
            {name: "yandex-verification", content: "680a473ef3bb561e"},
            {property: "og:type", content: "website"},
            {property: "og:locale", content: "ru_RU"},
            {property: "og:site_name", content: "АвтоВыкуп Хабаровск"},
            {property: "og:title", content: OG_TITLE},
            {property: "og:description", content: OG_DESCRIPTION},
            {property: "og:url", content: "https://avtovykupkhb27.ru/"},
            {property: "og:image", content: OG_IMAGE},
            {property: "og:image:width", content: "1200"},
            {property: "og:image:height", content: "630"},
            {property: "og:image:alt", content: "Выкуп автомобилей в Хабаровске"},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: "Выкуп авто Хабаровск за 15 минут"},
            {name: "twitter:description", content: "Срочный выкуп автомобилей. Битые, кредитные, без документов. Деньги сразу"},
            {name: "twitter:image", content: OG_IMAGE},
            {name: "geo.region", content: "RU-KHA"},
            {name: "geo.placename", content: "Хабаровск"},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "preload", as: "image", href: "/hero.webp", fetchPriority: "high"},
            {rel: "preconnect", href: "https://mc.yandex.ru"},
            {rel: "preconnect", href: "https://functions.poehali.dev"},
            {rel: "icon", type: "image/svg+xml", href: "/favicon.svg"},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            ...SITE_JSON_LD.map((data) => ({type: "application/ld+json", children: JSON.stringify(data)})),
            {children: TOP_MAIL_RU},
            {children: YANDEX_METRIKA},
            {children: YANDEX_DIRECT_PIXEL},
            {children: VK_PIXEL},
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFound,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <CanonicalTag/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        <noscript>
            <div><img src="https://top-fwz1.mail.ru/counter?id=3804920;js=na" style={{position: "absolute", left: "-9999px"}} alt="Top.Mail.Ru"/></div>
            <div><img src="https://mc.yandex.ru/watch/104279599" style={{position: "absolute", left: "-9999px"}} alt=""/></div>
        </noscript>
        {children}
        <Scripts/>
        </body>
        </html>
    );
}
