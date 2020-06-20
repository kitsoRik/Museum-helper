export const LOADED = "LOADED",
	LOADED_ERROR = "LOADED_ERROR",
	IS_LOADING = "IS_LOADING",
	NOT_LOADED = "NOT_LOADED",
	ERROR_LOADING = "ERROR_LOADING",
	CHANGED = "CHANGED",
	IS_CHANGING = "CHANGING",
	NOT_CHANGED = "NOT_CHANGED",
	ERROR_CHANGING = "ERROR_CHANGING",
	WAITING = "WAITING",
	NOT_WAITING = "NOT_WAITING",
	IS_VERIFYING = "IS_VERIFYING",
	VERIFIED = "VERIFIED",
	NOT_VERIFIED = "NOT_VERIFIED",
	DIRECTION_UP = "DIRECTION_UP",
	DIRECTION_DOWN = "DIRECTION_DOWN";

export const LANGUAGES = [
	{ dev: "ukrainian", prod: "Українська (Ukrainian)" },
	{ dev: "russian", prod: "Русская (Russian)" },
	{ dev: "english", prod: "English" },
	{ dev: "belarus", prod: "Беларуская (Belarusian)" },
	{ dev: "chinese", prod: "中文 (Chinese)" },
	{ dev: "hindi", prod: "हिन्दी (Hindi)" },
	{ dev: "spanish", prod: "Española (Spanish)" },
	{ dev: "arabic", prod: "عربى (Arabic)" },
	{ dev: "bengali", prod: "বাংলা (Bengali)" },
	{ dev: "portuguese", prod: "Portuguesa (Portuguese)" },
	{ dev: "french", prod: "Française (French)" },
];

// export const LANGUAGES_BY_DEV = LANGUAGES.reduce((p = {}, c) => { p[c.dev] = c.prod });
export const LANGUAGES_BY_DEV = (() => {
	let result = {};
	LANGUAGES.forEach((l) => {
		result[l.dev] = l.prod;
	});
	return result;
})();
