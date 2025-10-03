import { isUsingAwg } from '#utils/wgHelper';

export default defineEventHandler(async () => {
  return {
    isUsingAwg: isUsingAwg(),
  };
});