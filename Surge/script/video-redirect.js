const PLAYERS = {
 'vlc': {
  scheme: 'vlc-x-callback://x-callback-url/stream?url=',
  encode: true
 },
 'infuse': {
  scheme: 'infuse://x-callback-url/play?url=',
  encode: true
 },
 'vidhub': {
  scheme: 'open-vidhub://x-callback-url/open?url=',
  encode: true
 }
};

// 获取参数
const params = getParams($argument);
const playerType = params.player || 'vidhub';
const videoFormats = params.formats ? params.formats.split('|') : ['m3u8', 'mp4', 'avi', 'mkv', 'flv', 'ts'];

// 获取原始 URL
let url = $request.url;

// 检查是否为视频流
const isVideo = videoFormats.some(format => url.toLowerCase().includes('.' + format));

if (isVideo && PLAYERS[playerType]) {
 const player = PLAYERS[playerType];
 let redirectURL;

 if (player.encode) {
  redirectURL = player.scheme + encodeURIComponent(url);
 } else {
  redirectURL = player.scheme + url;
 }

 console.log(`[视频跳转] ${playerType}: ${url}`);

 $done({
  response: {
   status: 302,
   headers: {
    Location: redirectURL
   }
  }
 });
} else {
 $done({});
}

// 解析参数函数
function getParams(str) {
 if (!str) return {};
 const params = {};
 str.split('&').forEach(item => {
  const [key, value] = item.split('=');
  if (key && value) {
   params[key] = decodeURIComponent(value);
  }
 });
 return params;
}
