import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL, logouterArtist } from '../AxiosFunctions/Axiosfunctionality';

export const keywordDataApi = createAsyncThunk(
    'artist/keywordDataApi',
    async (payload) => {
        return axios
        .post(BASE_URL+("keywordKid/getAllClientKid"))
        .then((response) => response.data)
        .catch((response) => logouterArtist())
    } 
)

const initialState = {
    keyword:null
}

const keywordSlice = createSlice({
    name: "keyword",
    initialState,
    reducers: {
        storeKeyword: (state, param) => {
            console.log('KEYWORD SLICE',state,param)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(keywordDataApi.fulfilled, (action,state) => {
            state = state.payload
            return state
        })
    },
});


const { actions, reducer } = keywordSlice
export const { storeKeyword } = actions;
export default reducer;
