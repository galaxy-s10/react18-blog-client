import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IResponsePaging, IArticle, ITag } from '@/interface';
import { fetchArticleList } from '@/services/article';
import { fetchPosition } from '@/services/position';
import { fetchTagList } from '@/services/tag';
import {
  fetchVisitorDayData,
  fetchVisitorHistoryData,
} from '@/services/visitor';
import { IResponse } from '@/utils/request';

interface IError {
  code: number;
  msg: string;
}

const initialState = {
  // ip信息
  ipInfo: null,
  // 前端数据
  frontendData: null,
  // 统计数据
  statisData: null,
  // 是否显示文章目录
  showCatalog: false,
  // 是否显示梅花特效
  showPlum: false,
  // 是否显示音乐播放器
  showMusicAudio: false,
  // 是否使用瀑布流
  isWaterFall: false,
  // 是否隐藏header
  hiddenHeader: false,
  // 当天流量
  visitorDayData: { visit_total: null, visitor_total: null },
  // 历史流量
  visitorHistoryData: { visit_total: null, visitor_total: null },
  // 侧边栏文章列表
  sideBarArticleList: [] as IArticle[],
  // 侧边栏文章类型
  sideBarArticleOrderName: 'updated_at' as 'updated_at' | 'click',
  // 侧边栏标签列表
  sideBarTagList: [] as ITag[],
};

// 获取ip定位
export const getIpPosition = createAsyncThunk<
  // 返回值类型
  IResponse<any>,
  // 传参时的参数类型
  undefined,
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('getIpPosition', async (param, thunkApi) => {
  try {
    console.log('getIpPosition的参数', param);
    const res = await fetchPosition();
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// 获取当天流量信息
export const getVisitorDayData = createAsyncThunk<
  // 返回值类型
  IResponse<any>,
  // 传参时的参数类型
  { startTime: string; endTime: string },
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('getVisitorDayData', async (param, thunkApi) => {
  try {
    console.log('getVisitorDayData的参数', param);
    const res = await fetchVisitorDayData(param);
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// 获取历史流量信息
export const getVisitorHistoryData = createAsyncThunk<
  // 返回值类型
  IResponse<any>,
  // 传参时的参数类型
  undefined,
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('getVisitorHistoryData', async (param, thunkApi) => {
  try {
    console.log('getVisitorHistoryData的参数', param);
    const res = await fetchVisitorHistoryData();
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// 获取侧边栏文章列表
export const getSidebarArticleList = createAsyncThunk<
  // 返回值类型
  IResponsePaging<IArticle>,
  // 传参时的参数类型
  undefined,
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('getSidebarArticleList', async (param, thunkApi) => {
  try {
    console.log(
      'getSidebarArticleList的参数',
      param,
      thunkApi.getState(),
      initialState.sideBarArticleOrderName
    );
    const res = await fetchArticleList({
      nowPage: 1,
      pageSize: 5,
      // @ts-ignore
      orderName: thunkApi.getState().app.sideBarArticleOrderName,
    });
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// 获取侧边栏标签列表
export const getSidebarTagList = createAsyncThunk<
  // 返回值类型
  IResponsePaging<ITag>,
  // 传参时的参数类型
  undefined,
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('getSidebarTagList', async (param, thunkApi) => {
  try {
    console.log(
      'getSidebarTagList的参数',
      param,
      thunkApi.getState(),
      initialState.sideBarArticleOrderName
    );
    const res = await fetchTagList({
      nowPage: 1,
      pageSize: 10,
    });
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

// 创建store
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIpInfo(state, { payload }) {
      console.log('reducers-setIpInfo', state, payload);
      state.ipInfo = payload;
    },
    setStatisData(state, { payload }) {
      console.log('reducers-setStatisData', state, payload);
      state.statisData = payload;
    },
    setSideBarArticleOrderName(state, { payload }) {
      console.log('reducers-setSideBarArticleOrderName', state, payload);
      state.sideBarArticleOrderName = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSidebarTagList.pending, (state, action) => {
        console.log('getSidebarTagList.pending', state, action);
      })
      .addCase(getSidebarTagList.fulfilled, (state, { payload }) => {
        console.log('getSidebarTagList.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        state.sideBarTagList = payload.data.rows;
      })
      .addCase(getSidebarTagList.rejected, (state, { payload }) => {
        console.log('getSidebarTagList.rejected', state, payload);
      })
      .addCase(getVisitorHistoryData.pending, (state, action) => {
        console.log('getVisitorHistoryData.pending', state, action);
      })
      .addCase(getVisitorHistoryData.fulfilled, (state, { payload }) => {
        console.log('getVisitorHistoryData.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        state.visitorHistoryData.visit_total = payload.data.visit_total;
        state.visitorHistoryData.visitor_total = payload.data.visitor_total;
      })
      .addCase(getVisitorHistoryData.rejected, (state, { payload }) => {
        console.log('getVisitorHistoryData.rejected', state, payload);
      })
      .addCase(getVisitorDayData.pending, (state, action) => {
        console.log('getVisitorDayData.pending', state, action);
      })
      .addCase(getVisitorDayData.fulfilled, (state, { payload }) => {
        console.log('getVisitorDayData.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        state.visitorDayData.visit_total = payload.data.visit_total;
        state.visitorDayData.visitor_total = payload.data.visitor_total;
      })
      .addCase(getVisitorDayData.rejected, (state, { payload }) => {
        console.log('getVisitorDayData.rejected', state, payload);
      })
      .addCase(getIpPosition.pending, (state, action) => {
        console.log('getIpPosition.pending', state, action);
      })
      .addCase(getIpPosition.fulfilled, (state, { payload }) => {
        console.log('getIpPosition.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        state.ipInfo = payload.data;
      })
      .addCase(getIpPosition.rejected, (state, { payload }) => {
        console.log('getIpPosition.rejected', state, payload);
      })
      .addCase(getSidebarArticleList.pending, (state, action) => {
        console.log('getSidebarArticleList.pending', state, action);
      })
      .addCase(getSidebarArticleList.fulfilled, (state, { payload }) => {
        console.log('getSidebarArticleList.fulfilled', state, payload);
        // state = payload.data; //不能重新赋值，不是响应式
        state.sideBarArticleList = payload.data.rows;
      })
      .addCase(getSidebarArticleList.rejected, (state, { payload }) => {
        console.log('getSidebarArticleList.rejected', state, payload);
      });
  },
});

// 返回reducer
export const { setIpInfo, setStatisData, setSideBarArticleOrderName } =
  appSlice.actions;
// 返回reducer
export const { reducer } = appSlice;
// 返回slice
export default appSlice;
