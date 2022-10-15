import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IList, IResponsePaging, IType } from '@/interface';
import { fetchTypeList } from '@/services/type';
import { IResponse } from '@/utils/request';

interface IError {
  code: number;
  msg: string;
}

export const ajaxGetTypelist = createAsyncThunk<
  // 返回值类型
  IResponsePaging<IType>,
  // 传参时的参数类型
  IList<any>,
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('ajax/getTypelist', async (param, thunkApi) => {
  try {
    console.log('ajaxGetTypelist的参数', param);
    const res = await fetchTypeList(param);
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  list: [] as IList<IType>[],
};

// 创建store
const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ajaxGetTypelist.pending, (state, action) => {
        console.log('ajaxGetTypelist.pending', state, action);
      })
      .addCase(ajaxGetTypelist.fulfilled, (state, { payload }) => {
        console.log('ajaxGetTypelist.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        state.list = payload.data.rows;
      })
      .addCase(ajaxGetTypelist.rejected, (state, { payload }) => {
        console.log('ajaxGetTypelist.rejected', state, payload);
      });
  },
});

// 返回reducer
export const { reducer } = typeSlice;
// 返回slice
export default typeSlice;
