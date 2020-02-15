import updatePictures from "./updatePictures";
import { loadPicturesStart, loadPicturesSuccess } from "../actions/picturesActions";
import { IS_LOADING, LOADED } from "../constants";


describe('PICTURES', () => {
    const initState = { };
    it('loadPicturesStart', () => {
        const searchParams = {
            searchText: '',
            sortedField: 'none',
            sortedType: 'ASC'
        };
        const state = updatePictures(initState, loadPicturesStart(searchParams));

        expect(state).toEqual({
            ...initState,
            searchParams,
            loading: IS_LOADING
        });
    });

    it('loadPicturesSuccess', () => {
        const pictures = [1,2,3], pagesCount = 5;
        const state = updatePictures(initState, loadPicturesSuccess({ pictures, pagesData: { pagesCount } }));

        expect(state).toEqual({
            ...initState,
            loading: LOADED,
            pictures,
            pagesCount
        });
    });
});