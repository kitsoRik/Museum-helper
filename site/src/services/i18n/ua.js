export default {
    documentation: {
        title: 'Документація',
        what: "Що це за сервіс?",
        whatDescribe: "Це сервіс який дозволяє простим користувачам зберігати дані про картини в музеях в своєму смартфоні.",

        howToUse: {
            title: "Як почати користуватися?",
            description: "Для початку потрібно зареєструватися в сервісі, так ознайомитися з можливостями:",

            list: {
                1: '1. Створити музей',
                2: '2. Добавити картину',
                3: '3. Розповсюдити в додатку'
            }
        },

        createMuseum: {
            title: 'Створення музею',
            description: `Для того щоб створити музей, потрібно на вкладці {link} клікнути
                        на кнопку позначену плюсом (+), після чого вказати назву музею за яким він буде
                        видаватися в пошуку та місце знаходження. `
        },

        addPicture: {
            title: 'Добавлення картини',
            description: `Для того щоб добавити картину потрібно зайти на сторінку {link} (повинен бути створений принаймі один музей),
            нажати кнопку позначену плюсом (+) та вказати основні дані (тільки для розробника) картини (ім'я, опис та QR код за яким буде видаватися картина),
            далі можна приступити до додавання зображень картини та опису картини на різних мовах.`
        },

        release: {
            title: 'Розповсюдження',
            description: `При створення та редагуванні картин їх не можливо знайти до поки не буде добавлено новий випуск, 
            який тільки останні картини виставить у пошук (картини які позначено "не входити" в випуск - не ввійдуть).
            Після випуску можна приступати до редагування картин, ці зміни не будуть показуватися до нового випуску.`
        }

    },
    museums: {
        title: 'Музеї',
        addMuseumDialog: {
            title: 'Додати музей'
        },
        museumItem: {
            newRelease: 'Новий випуск'
        },
        newReleaseDialog: {
            title: "Новий випуск",
            description: "Опис змін"
        }
    },
    picture: {
        title: 'Зображення',
        development: 'Розробка',
        production: 'Випуск',
        includeNextRelease: "Включити в наступний випуск",
        icons: 'Зображення',
        selectLanguage: 'Виберіть мову',
        addFirstLanguage: 'Додайте інформацію про свою першу мову',
        addLanguageInfo: {
            title: 'Додати мову'
        },
        removeDialog: {
            title: "Видалення зображення",
            description: 'Дійсно видалити?',
            yes: 'Так, видалити',
            cancel: 'Скасувати'
        }
    },
    pictures: {
        title: 'Картини',
        searchPlaceholder: 'Пошук...',
        museumWithoutPictures: 'Цей музей без малюнків. Додайте зображення!',
        addPicture: 'Додати зображення',
        addMuseumLabel: 'Додайте музей для продовження роботи на цій сторінці',
        selectMuseumLabel: "Виберіть музей",
        sortField: 'Поле сортування',
        releaseId: 'Випуск',
    },
    favorites: {
        title: 'Вибране',
        addNewGroup: 'Додати нову групу',
        otherGroup: {
            title: 'Інше',
            description: 'Для елементів без групи'
        }
    },
    home: {
        title: 'Головна',
        getStarted: "Почати",
        or: 'або',
        goToWork: 'до роботи',
        login: 'ввійти'
    },
    profile: {
        title: 'Профіль',
        username: "Нікнейм",
        email: "E-Mail",
        password: "Пароль",
        confirm: "Підтвердження пароля",
        change: "Змінити",
        oldPassword: "Поточний пароль",
        changePassword: "Змінити пароль"
    },
    constants: {
        none: "Немає",
        name: "Ім'я",
        description: 'Опис',
        title: 'Назва',
        current: 'поточний',
        qrcode: 'QR-код',
        museum: 'Музей',
        add: 'Додати',
        remove: 'Видалити',
        location: 'Місцезнаходження',
        language: 'Мова',
        addToFavorite: 'Додати до Вибраних',
        removeFromFavorite: 'Прибрати з вибраних'
    },
    login: {
        title: 'Вхід',
        emailPlaceholder: 'e-mail...',
        passwordPlaceholder: 'Пароль...',
        enter: 'Ввійти',
        register: 'реєстрація',
        error: {
            badUserData: 'Невірні дані'
        },
        needToVerifyText: `Потрібно підтвердити e-mail, відправити лист ще раз?`,
        sendLinkAgain: "Вдправити ще раз"
    },
    register: {
        title: 'Реєстрація',
        username: 'Нікнейм',
        email: 'E-mail',
        password: 'Пароль',
        confirm: 'Підтвердження',
        register: 'Зареєструватися',
        loginIn: 'ввійти',
        error: {
            emailIsBusy: 'E-mail зайнятий',
            usernameIsBudy: "Нікнейм занятий",
            passwordLengthLess: "Довжина пароля повинна становити більше 8 символів",
            passwordAndComfirnNotIdentical: "Пароль та підтвердження не співпадають",
            unknownError: 'Невідома помилка'
        },
        verifyText: `Ви успішно пройшли реєстрацію. Вам на e-mail було вислано лист з посиланням для підтвердження`
    },
    verify: {
        unknownLink: "Невідоме посилання",
        emailHasBeenVerified: "Email: {email} успішно підтвердженно",
        toLogin: 'перезайти'
    }
};