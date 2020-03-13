export default {
    documentation: {
        title: 'Documentation',
        what: "What is this service",
        whatDescribe: "This is a service that allows ordinary users to store museum data on their smartphone.",

        howToUse: {
            title: "How to get started?",
            description: "To get started, you need to sign up for the service, so familiarize yourself with the features:",

            list: {
                1: '1. Create a Museum',
                2: '2. Add a picture',
                3: '3. Distribute in'
            }
        },

        createMuseum: {
            title: 'Creating a Museum',
            description: `To create a museum, click on the {link} tab
                        on the button marked with a plus (+), then specify the name of the museum after which it will be
                        appear in search and location. `
        },

        addPicture: {
            title: 'Add a picture',
            description: `To add a painting, you must visit the {link} page (at least one museum must be created),
            click on the plus (+) button and specify the master data (developer only) of the painting (name, description and QR code for which the painting will be issued),
            can then proceed to add a picture of the painting and a description of the painting in different languages.`
        },

        release: {
            title: 'Distribution',
            description: `When creating and editing pictures, they cannot be found until a new issue is added,
                    which will only search for the most recent paintings (pictures that are marked "do not enter" in the issue will not be included).
                    After the release, you can start editing pictures, these changes will not be displayed for a new release.`
        }

    },
    museums: {
        title: 'Museums',
        addMuseumDialog: {
            title: 'Add museum'
        },
        museumItem: {
            newRelease: 'New release'
        },
        newReleaseDialog: {
            title: "New release",
            description: "Description on changes"
        }
    },
    picture: {
        title: 'Picture',
        development: 'Development',
        production: 'Production',
        includeNextRelease: "Include in next release",
        icons: 'Icons',
        selectLanguage: 'Select language',
        addFirstLanguage: 'Add your first language info',
        addLanguageInfo: {
            title: 'Add language info'
        },
        removeDialog: {
            title: "Remove picture",
            description: 'Remove it?',
            yes: 'Yes, remove it',
            cancel: 'Cancel'
        }
    },
    pictures: {
        title: 'Pictures',
        searchPlaceholder: 'Search...',
        museumWithoutPictures: 'This museum without pictures. Add picture!',
        addPicture: 'Add picture',
        addMuseumLabel: 'Add museum to continue work on this page',
        selectMuseumLabel: "Select museum",
        sortField: 'Sort field',
        releaseId: 'Release id'
    },
    favorites: {
        title: 'Favorites',
        addNewGroup: 'Add new group',
        otherGroup: {
            title: 'Other',
            description: 'For items without group'
        }
    },
    home: {
        title: 'Home',
        getStarted: "Get started",
        or: 'or',
        goToWork: 'go to work',
        login: 'login'
    },
    profile: {
        title: 'Profile',
        username: "Username",
        email: "E-Mail",
        password: "Password",
        confirm: "Password confirm",
        change: "Change",
        oldPassword: "Current password",
        changePassword: "Change password"
    },
    constants: {
        none: "None",
        name: 'Name',
        description: 'Description',
        title: 'Title',
        current: 'current',
        qrcode: 'QR Code',
        museum: 'Museum',
        add: 'Add',
        remove: 'Remove',
        delete: 'Delete',
        location: 'Location',
        language: 'Language',
        addToFavorite: 'Add to Favorites',
        removeFromFavorite: 'Remove from Favorites'
    },
    login: {
        title: 'Login',
        emailPlaceholder: 'email...',
        passwordPlaceholder: 'password...',
        enter: 'Enter',
        register: 'register',
        error: {
            badUserData: 'Bad user data'
        },
        needToVerifyText: `Need to verify email, send vefiry link more?`,
        sendLinkAgain: "Send link again"
    },
    register: {
        title: 'Register',
        username: 'Username',
        email: 'Email',
        password: 'Password',
        confirm: 'Confirm',
        register: 'Register',
        loginIn: 'Login in',
        error: {
            emailIsNotValid: "Email is not valid",
            emailIsBusy: 'Email is busy',
            usernameIsBudy: "Username is busy",
            passwordLengthLess: "Password length < 8",
            passwordAndComfirnNotIdentical: "Password and confirm is not identical",
            unknownError: 'Unknown error'
        },
        verifyText: `You was registered, please vefiry your email!
                    Verify link sending to your email`
    },
    verify: {
        unknownLink: "Unknown verify link",
        emailHasBeenVerified: "Email: {email} has been verified",
        toLogin: 'to login'
    }
};