import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { mockAjax } from '@/utils';

interface IAjax {
  code: number;
  data: {
    id: number;
    name: string;
    age: number;
    token: string;
  };
}

interface IError {
  code: number;
  msg: string;
}

interface IUser {
  id?: number;
  name?: string;
  age?: number;
  token?: string;
}

export const ajaxGetUserLogin = createAsyncThunk<
  // 返回值类型
  IAjax,
  // 传参时的参数类型
  { id },
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('ajax/getUserInfo', async (param, thunkApi) => {
  try {
    console.log('ajaxGetUserLogin的参数', param);
    const response = await mockAjax(param.id === 1);
    return response as IAjax;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  id: -1,
  name: undefined,
  age: undefined,
  token: undefined,
} as IUser;

// 创建store
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ajaxGetUserLogin.pending, (state, action) => {
        console.log('ajaxGetUserLogin.pending', state, action);
      })
      .addCase(ajaxGetUserLogin.fulfilled, (state, { payload }) => {
        console.log('ajaxGetUserLogin.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        const { id, name, age, token } = payload.data;
        state.id = id;
        state.name = name;
        state.age = age;
        state.token = token;
      })
      .addCase(ajaxGetUserLogin.rejected, (state, { payload }) => {
        console.log('ajaxGetUserLogin.rejected', state, payload);
      });
  },
});

// 返回reducer
export const { reducer } = userSlice;
// 返回slice
export default userSlice;
