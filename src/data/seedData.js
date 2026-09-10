let uid = 1000
export function nextId(prefix = 'id') {
    uid += 1
    return `${prefix}-${uid}`
}


export const seedProjects = [
    {
        id: 'proj-1',
        title: 'Полуночный экспресс',
        format: 'Короткий метр',
        logline:
            'Проводница ночного поезда замечает пассажира, которого не было в списке. По мере пути становится ясно, что поезд везёт не только живых.',
        status: 'shoot',
        createdLabel: 'создан 14 марта',
        updatedLabel: 'обн. 2 дня назад',
        scenes: [
            {
                id: 'scene-1',
                title: 'Вокзал. Ночь',
                description:
                    'Проводница Ира проверяет билеты у дверей вагона, платформа почти пуста.',
                status: 'done',
                intext: 'EXT',
                daynight: 'Ночь',
                take: '2',
                thumbnail:
                    'https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=400&auto=format&fit=crop',
                plan: '1. Общий план платформы.\n2. Проводница у входа в вагон, свет фонарей.',
                tech: {
                    location: 'Платформа, вокзал (натура)',
                    duration: '≈ 30 сек',
                    lens: '35 мм, T2.0',
                    actors: 'Ира (главная роль)',
                    props: 'Форма проводника, фонарь, бланк билетов',
                },
                notes: '',
                references: [],
            },
            {
                id: 'scene-2',
                title: 'Купе поезда. Ночь',
                description: 'Ира замечает лишнего пассажира — тот сидит, не глядя в камеру.',
                status: 'done',
                intext: 'INT',
                daynight: 'Ночь',
                take: '3',
                thumbnail:
                    'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=400&auto=format&fit=crop',
                plan: '1. Средний план купе.\n2. Крупный план лица пассажира.',
                tech: {
                    location: 'Купе (декорация, павильон Б)',
                    duration: '≈ 40 сек',
                    lens: '50 мм, T2.0',
                    actors: 'Ира, Пассажир',
                    props: 'Чемодан, старый билет',
                },
                notes: '',
                references: [],
            },
            {
                id: 'scene-3',
                title: 'Тамбур. Ночь',
                description:
                    'Ира сверяет список пассажиров при свете фонарика — фамилии из купе №4 в списке нет. За стеклом тамбура мелькают редкие огни, поезд качает. Держим её лицо крупным планом: сомнение сменяется тревогой. Звук колёс становится громче обычного, будто акцентируя момент.',
                status: 'shoot',
                intext: 'INT',
                daynight: 'Ночь',
                take: '—',
                thumbnail: null,
                plan:
                    '1. Общий план тамбура — качающийся свет лампы дневного света.\n2. Крупный план рук Иры, листающих список.\n3. Наезд на лицо — момент, когда она понимает несостыковку.\n4. Резкий стук по стеклу снаружи (спецэффект — постпродакшн).\n\nКамера: ручной штатив, лёгкое покачивание в такт поезду.\nСвет: практический — мигающая лампа + холодный контровой от окна.',
                tech: {
                    location: 'Вагон-тамбур (декорация, павильон Б)',
                    duration: '≈ 45 сек',
                    lens: '35 мм, T2.0',
                    actors: 'Ира (главная роль)',
                    props: 'Фонарик, бланк со списком, форма проводника',
                },
                notes:
                    'Проверить, не слишком ли громкий стук по стеклу — на прошлой сцене звукорежиссёр жаловался на перегруз. Уточнить у художника по свету доступность мигающей лампы на дату съёмки.',
                references: [
                    {
                        id: 'ref-1',
                        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop',
                        caption: 'свет в тамбуре',
                    },
                    {
                        id: 'ref-2',
                        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=400&auto=format&fit=crop',
                        caption: 'крупный план, тревога',
                    },
                    {
                        id: 'ref-3',
                        url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=400&auto=format&fit=crop',
                        caption: 'композиция кадра',
                    },
                    {
                        id: 'ref-4',
                        url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=400&auto=format&fit=crop',
                        caption: 'холодный контровой свет',
                    },
                ],
            },
            {
                id: 'scene-4',
                title: 'Купе. Ночь. Флешбэк',
                description: 'Короткая вспышка — тот же пассажир тридцать лет назад, на этом же месте.',
                status: 'shoot',
                intext: 'INT',
                daynight: 'Ночь',
                take: '—',
                thumbnail:
                    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=400&auto=format&fit=crop',
                plan: 'Флешбэк-вставка, зерно плёнки, тёплый свет.',
                tech: {
                    location: 'Купе (декорация)',
                    duration: '≈ 8 сек',
                    lens: '50 мм',
                    actors: 'Пассажир (моложе)',
                    props: '—',
                },
                notes: '',
                references: [],
            },
            {
                id: 'scene-5',
                title: 'Вагон-ресторан. Ночь',
                description:
                    'Ира ищет проводника соседнего вагона, вагон-ресторан пуст и освещён неровно.',
                status: 'prep',
                intext: 'INT',
                daynight: 'Ночь',
                take: '—',
                thumbnail: null,
                plan: '',
                tech: { location: '', duration: '', lens: '', actors: '', props: '' },
                notes: '',
                references: [],
            },
            {
                id: 'scene-6',
                title: 'Крыша вагона. Ночь',
                description: 'Наружная сцена: силуэт на крыше движущегося поезда, звук ветра.',
                status: 'todo',
                intext: 'EXT',
                daynight: 'Ночь',
                take: '—',
                thumbnail: null,
                plan: '',
                tech: { location: '', duration: '', lens: '', actors: '', props: '' },
                notes: '',
                references: [],
            },
        ],
    },
    {
        id: 'proj-2',
        title: 'Сахар и сталь',
        format: 'Реклама · 30″',
        logline: 'Промо новой линейки кофемашин: контраст тепла и металла.',
        status: 'post',
        createdLabel: 'создан 2 февраля',
        updatedLabel: 'обн. вчера',
        scenes: [],
    },
    {
        id: 'proj-3',
        title: 'Соль на губах',
        format: 'Видеоклип',
        logline: 'Клип про прощание на берегу — соль, ветер и разбитый мотоцикл.',
        status: 'prep',
        createdLabel: 'создан 20 января',
        updatedLabel: 'обн. 5 дней назад',
        scenes: [],
    },
    {
        id: 'proj-4',
        title: 'Последний гончар',
        format: 'Документальный',
        logline: 'Портрет мастера, который лепит горшки так же, как тридцать лет назад.',
        status: 'todo',
        createdLabel: 'создан сегодня',
        updatedLabel: 'создан сегодня',
        scenes: [],
    },
    {
        id: 'proj-5',
        title: 'Вес тишины',
        format: 'Короткий метр',
        logline: 'Глухой сторож маяка находит на берегу дневник затонувшего корабля.',
        status: 'done',
        createdLabel: 'создан в прошлом году',
        updatedLabel: 'обн. месяц назад',
        scenes: [],
    },
]

export function emptyScene(overrides = {}) {
    return {
        id: nextId('scene'),
        title: 'Новая сцена',
        description: '',
        status: 'todo',
        intext: 'INT',
        daynight: 'День',
        take: '—',
        thumbnail: null,
        plan: '',
        tech: { location: '', duration: '', lens: '', actors: '', props: '' },
        notes: '',
        references: [],
        ...overrides,
    }
}

export function emptyProject(overrides = {}) {
    return {
        id: nextId('proj'),
        title: 'Новый проект',
        format: '',
        logline: '',
        status: 'todo',
        createdLabel: 'создан сегодня',
        updatedLabel: 'создан сегодня',
        scenes: [],
        ...overrides,
    }
}
