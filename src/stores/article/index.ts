import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IList, IResponsePaging, IArticle } from '@/interface';
import { fetchArticleList } from '@/services/article';

interface IError {
  code: number;
  msg: string;
}

const initialState = {
  types: '-1',
  tags: [],
  list: [] as IList<IArticle>[],
  nowPage: 1,
  pageSize: 10,
  hasMore: false,
  total: -1,
};

// 获取文章列表
export const getArticleList = createAsyncThunk<
  // 返回值类型
  IResponsePaging<IArticle>,
  // 传参时的参数类型
  IList<IArticle>,
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('getArticleList', async (param, thunkApi) => {
  try {
    console.log('getArticleList的参数', param);
    const res = await fetchArticleList(param);
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// 创建store
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setTypes(state, { payload }) {
      console.log('reducers-setTypes', state, payload);
      state.types = payload;
    },
    setList(state, { payload }) {
      console.log('reducers-setList', state, payload);
      state.list = payload;
    },
    setNowPage(state, { payload }) {
      console.log('reducers-setNowPage', state, payload);
      state.nowPage = payload;
    },
    setPageSize(state, { payload }) {
      console.log('reducers-setPageSize', state, payload);
      state.pageSize = payload;
    },
    setTotal(state, { payload }) {
      console.log('reducers-setTotal', state, payload);
      state.total = payload;
    },
    setHasMore(state, { payload }) {
      console.log('reducers-setHasMore', state, payload);
      state.hasMore = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getArticleList.pending, (state, action) => {
        console.log('getArticleList.pending', state, action);
      })
      .addCase(getArticleList.fulfilled, (state, { payload }) => {
        console.log('getArticleList.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        const { rows, hasMore, nowPage, pageSize, total } = payload.data;
        console.log(rows, hasMore, nowPage, pageSize, total);
        state.list = rows;
        state.hasMore = hasMore;
        state.nowPage = nowPage;
        state.pageSize = pageSize;
        state.total = total;
      })
      .addCase(getArticleList.rejected, (state, { payload }) => {
        console.log('getArticleList.rejected', state, payload);
      });
  },
});

// 返回reducer
export const {
  setHasMore,
  setNowPage,
  setPageSize,
  setTotal,
  setList,
  setTypes,
} = articleSlice.actions;
// 返回reducer
export const { reducer } = articleSlice;
// 返回slice
export default articleSlice;
