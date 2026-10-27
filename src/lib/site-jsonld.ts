// JSON-LD moved from the old index.html
export const SITE_JSON_LD: object[] = [
  {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "АвтоВыкуп Хабаровск",
    "description": "Срочный выкуп автомобилей в Хабаровске и Хабаровском крае",
    "url": "https://avtovykupkhb27.ru/",
    "telephone": "+79841771588",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Хабаровск",
      "addressRegion": "Хабаровский край",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.4827",
      "longitude": "135.0838"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Хабаровск"
      },
      {
        "@type": "City",
        "name": "Комсомольск-на-Амуре"
      },
      {
        "@type": "City",
        "name": "Амурск"
      },
      {
        "@type": "City",
        "name": "Советская Гавань"
      },
      {
        "@type": "City",
        "name": "Бикин"
      },
      {
        "@type": "City",
        "name": "Вяземский"
      },
      {
        "@type": "City",
        "name": "Николаевск-на-Амуре"
      },
      {
        "@type": "City",
        "name": "Ванино"
      },
      {
        "@type": "City",
        "name": "Переяславка"
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Срочный выкуп автомобилей",
          "description": "Выкуп авто в любом состоянии за 15 минут"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Выкуп битых автомобилей",
          "description": "Выкуп авто после ДТП"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Выкуп кредитных авто",
          "description": "Помощь в закрытии кредита"
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://avtovykupkhb27.ru/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Оценка авто",
        "item": "https://avtovykupkhb27.ru/evaluation"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Отзывы",
        "item": "https://avtovykupkhb27.ru/reviews"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Сколько времени занимает выкуп автомобиля?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Весь процесс от оценки до получения денег занимает 15-30 минут. Приезжаем в удобное для вас время, осматриваем авто, оформляем договор и сразу выплачиваем деньги."
        }
      },
      {
        "@type": "Question",
        "name": "Выкупаете ли вы битые автомобили?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, мы выкупаем автомобили в любом состоянии: битые после ДТП, не на ходу, с проблемами двигателя или коробки передач. Оценка зависит от реального состояния."
        }
      },
      {
        "@type": "Question",
        "name": "Можно ли продать машину в кредите?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, выкупаем кредитные автомобили. Помогаем закрыть кредит в банке и оформить все документы. Разница выплачивается вам сразу после погашения кредита."
        }
      },
      {
        "@type": "Question",
        "name": "Какие документы нужны для продажи?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Для продажи нужен только паспорт собственника и ПТС/СТС. Если документов нет — помогаем восстановить. Договор купли-продажи оформляем сами на месте."
        }
      },
      {
        "@type": "Question",
        "name": "Выезжаете ли вы за город?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, выезжаем по всему Хабаровскому краю: Комсомольск-на-Амуре, Амурск, Советская Гавань, Бикин, Вяземский и другие города. Выезд оценщика бесплатный."
        }
      }
    ]
  }
];
