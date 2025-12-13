import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Murmur {
  id: string;
  text: string;
  author_id: string;
  like_count: number;
  created_at: string;
  author_name?: string;
}

interface MurmursState {
  timeline: Murmur[];
  page: number;
  loading: boolean;
  hasMore: boolean;
}

const initialState: MurmursState = {
  timeline: [],
  page: 0,
  loading: false,
  hasMore: true
};

const murmursSlice = createSlice({
  name: 'murmurs',
  initialState,
  reducers: {
    setTimeline(state, action: PayloadAction<Murmur[]>) {
      state.timeline = action.payload;
      state.hasMore = action.payload.length === 10;
    },
    appendTimeline(state, action: PayloadAction<Murmur[]>) {
      state.timeline = [...state.timeline, ...action.payload];
      if (action.payload.length < 10) state.hasMore = false;
    },
    incrementLike(state, action: PayloadAction<string>) {
      const murmur = state.timeline.find(m => m.id === action.payload);
      if (murmur) murmur.like_count += 1;
    },
    decrementLike(state, action: PayloadAction<string>) {
      const murmur = state.timeline.find(m => m.id === action.payload);
      if (murmur) murmur.like_count -= 1;
    }
  }
});

export const { setTimeline, appendTimeline, incrementLike, decrementLike } = murmursSlice.actions;
export default murmursSlice.reducer;
