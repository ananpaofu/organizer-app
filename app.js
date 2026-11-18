(function () {
  'use strict';

  const DB_KEY = 'organizer_db_v1';

  const CATEGORIES = [
    { key: 'food', label: '食品', color: '#d8a99b' },
    { key: 'medicine', label: '药品', color: '#c98d86' },
    { key: 'cosmetic', label: '化妆品', color: '#bda0bb' },
    { key: 'clothing', label: '衣物', color: '#9db2c9' },
    { key: 'document', label: '文档', color: '#a8b1ab' },
    { key: 'electronic', label: '电子产品', color: '#8fae9c' },
    { key: 'other', label: '其他', color: '#bdb6ac' }
  ];

  const ICON = {
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="M3 7v10l9 5 9-5V7M12 12v10"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5a3.5 3.5 0 0 1 0 7M17.5 14a6.5 6.5 0 0 1 4 6"/></svg>',
    signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v17H7.5A2.5 2.5 0 0 0 5 22V5.5Z"/><path d="M9 8h6M9 12h5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h3l1.5-2h7L18 6h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7M21 3v6h-6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    homePin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10H3V10Z"/><path d="M9 20v-6h6v6"/></svg>',
    battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM6 6H4v2a3 3 0 0 0 3 3M18 6h2v2a3 3 0 0 1-3 3M12 13v4M9 21h6M10 17h4"/></svg>',
    fridge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M5 10h14M8 6v2M8 14v3"/></svg>',
    drawer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 7h6M9 12.5h6M9 17.5h6"/></svg>',
    shelf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 5h18M3 12h18M3 19h18M6 5v7M18 5v7M6 12v7M18 12v7"/></svg>',
    pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V4h8v3M8 12h8"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    a_cat: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21 7 8l11 7a16 16 0 0 1 12 0l11-7-2 13"/><path d="M9 21a15 15 0 0 0 30 0"/><circle cx="18.5" cy="24" r="1.7" fill="currentColor" stroke="none"/><circle cx="29.5" cy="24" r="1.7" fill="currentColor" stroke="none"/><path d="m21 29 3 2 3-2"/></svg>',
    a_rabbit: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 21c-4-6-6-14-3-15s6 6 7 12M30 21c4-6 6-14 3-15s-6 6-7 12"/><path d="M24 18c8 0 13 6 13 14 0 7-6 11-13 11s-13-4-13-11c0-8 5-14 13-14Z"/><circle cx="19" cy="30" r="1.6" fill="currentColor" stroke="none"/><circle cx="29" cy="30" r="1.6" fill="currentColor" stroke="none"/><path d="m22 35 2 1 2-1"/></svg>',
    a_bear: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="14" r="5"/><circle cx="35" cy="14" r="5"/><path d="M24 17c9 0 15 6 15 14 0 7-6 11-15 11s-15-4-15-11c0-8 6-14 15-14Z"/><circle cx="18.5" cy="28" r="1.7" fill="currentColor" stroke="none"/><circle cx="29.5" cy="28" r="1.7" fill="currentColor" stroke="none"/><path d="M21 34c1.5 1.5 4.5 1.5 6 0"/></svg>',
    a_fox: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9 16 18a17 17 0 0 1 16 0l8-9-3 15a15 15 0 0 1-26 0Z"/><circle cx="19" cy="26" r="1.6" fill="currentColor" stroke="none"/><circle cx="29" cy="26" r="1.6" fill="currentColor" stroke="none"/><path d="m21 32 3 2 3-2"/></svg>',
    a_bird: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 29c5-9 13-14 21-13l9-7-3 10c5 4 6 11 2 16-5 7-15 8-22 3-4-3-7-6-7-9Z"/><circle cx="17" cy="27" r="1.7" fill="currentColor" stroke="none"/><path d="m34 24 5 2-5 2"/></svg>',
    a_fish: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 24c7-10 18-12 26-5l9-7v24l-9-7c-8 7-19 5-26-5Z"/><circle cx="14" cy="22" r="1.7" fill="currentColor" stroke="none"/><path d="M25 17c2 4 2 10 0 14"/></svg>'
  };

  const ANIMAL_BY_CATEGORY = {
    food: 'rabbit', medicine: 'bear', cosmetic: 'cat',
    clothing: 'fox', document: 'bird', electronic: 'fish', other: 'cat'
  };

  const MAP_SPOTS = [
    { x: 24, y: 24 }, { x: 68, y: 20 }, { x: 80, y: 52 },
    { x: 34, y: 70 }, { x: 52, y: 45 }, { x: 16, y: 56 },
    { x: 70, y: 78 }, { x: 44, y: 18 }
  ];

  const HIFA_BUILDINGS = [
    { name: '1栋学生宿舍', lat: 30.3901, lng: 114.4170, approx: true },
    { name: '2栋学生宿舍', lat: 30.3898, lng: 114.4172, approx: true },
    { name: '3栋学生宿舍', lat: 30.3895, lng: 114.4174, approx: true },
    { name: '4栋学生宿舍', lat: 30.3888, lng: 114.4170, approx: true },
    { name: '5栋学生宿舍', lat: 30.3886, lng: 114.4168, approx: true },
    { name: '6栋学生宿舍', lat: 30.388313, lng: 114.416902 },
    { name: '7栋学生宿舍', lat: 30.3892, lng: 114.4180, approx: true },
    { name: '8栋学生宿舍', lat: 30.3891, lng: 114.4182, approx: true },
    { name: '9栋学生宿舍', lat: 30.3890, lng: 114.4184, approx: true },
    { name: '10栋学生宿舍', lat: 30.3889, lng: 114.4186, approx: true },
    { name: '11栋学生宿舍', lat: 30.3903, lng: 114.4190, approx: true },
    { name: '12栋学生宿舍', lat: 30.3904, lng: 114.4192, approx: true },
    { name: '13栋学生宿舍', lat: 30.3905, lng: 114.4194, approx: true },
    { name: '14栋学生宿舍', lat: 30.3906, lng: 114.4196, approx: true },
    { name: '15栋学生宿舍', lat: 30.3908, lng: 114.4180, approx: true },
    { name: '16栋学生宿舍', lat: 30.3909, lng: 114.4182, approx: true },
    { name: '17栋学生宿舍', lat: 30.3910, lng: 114.4184, approx: true },
    { name: '18栋学生宿舍', lat: 30.391342, lng: 114.418323 },
    { name: 'A1教学楼', lat: 30.3908, lng: 114.4198, approx: true },
    { name: 'A2教学楼', lat: 30.391404, lng: 114.420087 },
    { name: 'A3教学楼', lat: 30.3918, lng: 114.4205, approx: true },
    { name: 'A4教学楼', lat: 30.392242, lng: 114.421143 },
    { name: 'A5教学楼', lat: 30.3930, lng: 114.4208, approx: true },
    { name: 'A6教学楼', lat: 30.394306, lng: 114.419938 },
    { name: 'A7教学楼', lat: 30.3938, lng: 114.4196, approx: true },
    { name: 'A8教学楼', lat: 30.3945, lng: 114.4188, approx: true },
    { name: 'A9教学楼', lat: 30.3900, lng: 114.4180, approx: true },
    { name: '图书馆', lat: 30.392376, lng: 114.41738 },
    { name: '体育馆', lat: 30.3902, lng: 114.4172, approx: true },
    { name: '食堂', lat: 30.3898, lng: 114.4192, approx: true },
    { name: '陶艺馆', lat: 30.3942, lng: 114.4186, approx: true }
  ];

  const SCHOOLS = [
    {
      name: '湖北美术学院藏龙岛校区', short: '湖美藏龙岛',
      address: '武汉市江夏区藏龙岛科技园栗庙路5号',
      center: { lat: 30.391869, lng: 114.419028 }, radius: 800,
      buildings: HIFA_BUILDINGS
    }
  ];

  const FLOOR_OPTIONS = ['1层', '2层', '3层', '4层', '5层', '6层'];

  function roomsForFloor(buildingName, floor) {
    const f = parseInt(String(floor).replace(/[^0-9]/g, ''), 10) || 1;
    const isDorm = buildingName.indexOf('宿舍') !== -1;
    const isTeaching = /^A\d+教学楼$/.test(buildingName);
    const list = [];
    if (isDorm) {
      if (f === 1) {
        list.push('宿管室', '自习区', '活动室');
        for (let n = 101; n <= 108; n++) list.push('教室' + n);
      } else {
        for (let n = 1; n <= 24; n++) list.push(f * 100 + n + '');
      }
    } else if (isTeaching) {
      for (let n = 1; n <= 12; n++) list.push(f * 100 + n + '');
      list.push('自习区');
    } else if (buildingName.indexOf('图书馆') !== -1) {
      list.push('大厅', '自习区', '阅览区', '电子阅览室', '藏书区');
    } else {
      list.push('入口', '服务台', '主要区域');
    }
    return list;
  }

  const MAP_SDK_PLAN = [
    { title: '高德地图 JS API 2.0', steps: [
      '在开放平台申请 Web 端（JS API）Key，绑定域名白名单并配置安全密钥 jscode。',
      '引入 https://webapi.amap.com/loader.js，用 AMapLoader.load({ key, version: "2.0", plugins: ["AMap.Geolocation", "AMap.IndoorMap", "AMap.MarkerClusterer"] })。',
      '用 AMap.Geolocation 获取当前坐标（国内为 GCJ-02），设置 map.setCenter 与 zoom；校园范围可用圆形覆盖物做地理围栏。',
      '动物标签用 new AMap.Marker({ icon: new AMap.Icon({ image: 动物 SVG 的 data URL, size: [52, 52] }), position }) 叠加；点击 Marker 联动查找面板。',
      '室内楼层用 AMap.IndoorMap 按 buildingId 切换；房间级定位仍需蓝牙信标 / Wi-Fi RTT 辅助。'
    ] },
    { title: '百度地图 JavaScript API GL', steps: [
      '在百度地图开放平台创建应用，获取 AK，并设置 Referer 白名单。',
      '引入 https://api.map.baidu.com/api?type=webgl&v=3.0&ak=你的AK，再用 new BMapGL.Map("container") 初始化。',
      'BMapGL.Geolocation 获取 WGS-84 坐标，需通过 BMapGL.Convertor 转为 BD-09 后再打点（与高德 GCJ-02 不同源）。',
      '自定义动物图标用 new BMapGL.MarkerIcon(动物 SVG data URL, new BMapGL.Size(52, 52))，点击 Marker 触发一键查找。',
      '室内图使用 BMapGL 室内地图能力并叠加信标坐标，实现楼层 / 房间高亮。'
    ] },
    { title: '本项目接入方式', steps: [
      '保留现有手绘房间地图作为无网络 / 无 Key 时的降级方案；有 Key 时把 .find-map 容器替换为真实地图 div。',
      '弹窗打开后再初始化地图实例，关闭时调用 map.destroy() 清理，避免重复实例与内存泄漏。',
      '先请求定位权限；拒绝或超时则回退到已绑定学校 / 手动选择的校园中心点。',
      '坐标统一在服务端或工具层转换：GPS WGS-84 → GCJ-02（高德）或 BD-09（百度），不要混用。',
      '遵守个人信息保护要求：定位仅用于当前空间检索，明示用途并允许用户关闭。'
    ] }
  ];

  const SPACES = [
    { key: '冰箱', label: '冰箱', icon: 'fridge' },
    { key: '厨房', label: '厨房', icon: 'fridge' },
    { key: '药箱', label: '药箱', icon: 'pill' },
    { key: '抽屉', label: '抽屉', icon: 'drawer' },
    { key: '柜子', label: '柜子', icon: 'drawer' },
    { key: '衣柜', label: '衣柜', icon: 'shelf' },
    { key: '书房', label: '书房', icon: 'shelf' },
    { key: '储物', label: '储物间', icon: 'box' },
    { key: '玄关', label: '玄关', icon: 'homePin' },
    { key: '书桌', label: '书桌', icon: 'drawer' },
    { key: '阳台', label: '阳台', icon: 'homePin' }
  ];

  const DEFAULT_SPACE_KEYS = ['冰箱', '厨房', '药箱', '抽屉', '柜子', '衣柜'];
  const ANIMAL_CHOICES = [
    { key: 'cat', label: '猫咪' }, { key: 'rabbit', label: '兔子' },
    { key: 'bear', label: '小熊' }, { key: 'fox', label: '狐狸' },
    { key: 'bird', label: '小鸟' }, { key: 'fish', label: '小鱼' }
  ];

  const DEMO_POSTS = [
    { id: 'p1', name: '收纳达人阿晴', avatar: '晴', tone: 'pink', time: '2 小时前', tag: '收纳技巧', text: '分享一个小技巧：保质期快到的物品放在冰箱最显眼的位置，就不会忘记啦。', likes: 24, photo: '' },
    { id: 'p2', name: '小鹿', avatar: '鹿', tone: 'blue', time: '昨天', tag: '好物分享', text: '最近给重要物品都贴上了定位标签，手机一点就能找到，联动提醒也很实用！', likes: 18, photo: '' },
    { id: 'p3', name: '整理师 Mia', avatar: 'M', tone: '', time: '3 天前', tag: '生活灵感', text: '换季收纳时，给每件物品拍张照存档，之后找起来真的方便很多。', likes: 41, photo: '' }
  ];

  const CHATS = [
    { id: 'c1', name: '收纳交流群', avatar: '群', tone: '' },
    { id: 'c2', name: '小柔（邻居）', avatar: '柔', tone: 'pink' },
    { id: 'c3', name: '社区助手', avatar: '助', tone: 'blue' }
  ];

  const DEMO_MESSAGES = {
    c1: [
      { from: 'them', name: '阿晴', text: '大家平时怎么记录收纳日期呀？', time: '10:12' },
      { from: 'them', name: '小鹿', text: '我直接用这个 app，拍照加定位标签一步到位', time: '10:15' }
    ],
    c2: [
      { from: 'them', name: '小柔', text: '你家收纳盒在哪买的？好好看', time: '昨天' }
    ],
    c3: [
      { from: 'them', name: '社区助手', text: '你好！有任何收纳问题都可以问我哦～', time: '周一' }
    ]
  };

  const state = {
    view: 'home', search: '', filter: 'all', authTab: 'login',
    communityTab: 'feed', chatId: null, backTo: 'home',
    itemsOpen: false, hubSearch: ''
  };
  let lastView = null;
  let activeStream = null;

  function defaultDB() {
    return {
      users: [], items: [], session: null,
      posts: DEMO_POSTS.slice(),
      messages: { c1: (DEMO_MESSAGES.c1 || []).slice(), c2: (DEMO_MESSAGES.c2 || []).slice(), c3: (DEMO_MESSAGES.c3 || []).slice() },
      devices: [], spaceKeys: DEFAULT_SPACE_KEYS.slice(), locationEnabled: true
    };
  }

  function loadDB() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      const db = raw ? JSON.parse(raw) : defaultDB();
      if (!Array.isArray(db.users)) db.users = [];
      if (!Array.isArray(db.items)) db.items = [];
      if (!Array.isArray(db.posts)) db.posts = DEMO_POSTS.slice();
      if (!db.messages || typeof db.messages !== 'object') {
        db.messages = { c1: (DEMO_MESSAGES.c1 || []).slice(), c2: (DEMO_MESSAGES.c2 || []).slice(), c3: (DEMO_MESSAGES.c3 || []).slice() };
      }
      if (!Array.isArray(db.devices)) db.devices = [];
      if (!Array.isArray(db.spaceKeys)) db.spaceKeys = DEFAULT_SPACE_KEYS.slice();
      if (typeof db.locationEnabled !== 'boolean') db.locationEnabled = true;
      return db;
    } catch (e) { return defaultDB(); }
  }

  let db = loadDB();

  function saveDB() {
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
    catch (e) { toast('保存失败：本地存储空间不足', 'error'); }
  }

  function uid() { return 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  function currentUser() {
    if (!db.session) return null;
    return db.users.find(function (u) { return u.id === db.session; }) || null;
  }

  function getUserItems() {
    const user = currentUser();
    return user ? db.items.filter(function (i) { return i.userId === user.id; }) : [];
  }

  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function shiftDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function nowTime() {
    const d = new Date();
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  function daysUntil(dateStr) {
    if (!dateStr) return null;
    return Math.round((new Date(dateStr + 'T00:00:00') - new Date(todayStr() + 'T00:00:00')) / 86400000);
  }

  function expiryInfo(item) {
    if (!item.expiryDate) return { key: 'none', label: '无保质期', days: null };
    const d = daysUntil(item.expiryDate);
    if (d < 0) return { key: 'expired', label: '已过期 ' + Math.abs(d) + ' 天', days: d };
    if (d === 0) return { key: 'danger', label: '今天到期', days: 0 };
    if (d <= 3) return { key: 'danger', label: '还剩 ' + d + ' 天', days: d };
    if (d <= 7) return { key: 'warn', label: '还剩 ' + d + ' 天', days: d };
    if (d <= 30) return { key: 'soon', label: '还剩 ' + d + ' 天', days: d };
    return { key: 'fresh', label: '还剩 ' + d + ' 天', days: d };
  }

  function catOf(key) {
    return CATEGORIES.find(function (c) { return c.key === key; }) || CATEGORIES[CATEGORIES.length - 1];
  }

  function toast(message, type) {
    const el = document.createElement('div');
    el.className = 'toast ' + (type || '');
    el.textContent = message;
    $('#toast-root').appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 300);
    }, 2400);
  }

  function closeSheet() {
    $('#sheet-root').innerHTML = '';
  }

  function closeOverlay() {
    if (activeStream) { activeStream.getTracks().forEach(function (t) { t.stop(); }); activeStream = null; }
    destroyRealMap();
    $('#overlay-root').innerHTML = '';
  }

  function openConfirm(title, message, onConfirm) {
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet" style="max-height:60%">' +
        '<div class="sheet-handle"></div><div class="sheet-head"><h2>' + escapeHTML(title) + '</h2></div>' +
        '<p class="confirm-text">' + escapeHTML(message) + '</p>' +
        '<div class="sheet-actions">' +
          '<button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn danger" id="confirm-ok">确定删除</button>' +
        '</div>' +
      '</div></div>';
    $('#confirm-ok').onclick = function () { closeSheet(); onConfirm(); };
  }

  /* ---------------- Auth ---------------- */

  function renderAuth() {
    closeOverlay();
    $('#bottom-nav').classList.add('hidden');
    $('#app-view').innerHTML =
      '<div class="page auth-page">' +
        '<div class="auth-art"><div class="auth-orb">' + ICON.box + '</div>' +
          '<h1>收纳小管家</h1><p>让每件物品，都有迹可循</p></div>' +
        '<div class="auth-card">' +
          '<div class="segment">' +
            '<button data-action="auth-tab" data-value="login" class="' + (state.authTab === 'login' ? 'active' : '') + '">登录</button>' +
            '<button data-action="auth-tab" data-value="register" class="' + (state.authTab === 'register' ? 'active' : '') + '">注册</button>' +
          '</div>' +
          '<form id="auth-form">' +
            '<div class="field"><label>用户名</label><input id="auth-username" autocomplete="username" placeholder="请输入用户名"></div>' +
            (state.authTab === 'register'
              ? '<div class="field"><label>昵称（选填）</label><input id="auth-nickname" placeholder="希望我们怎么称呼你"></div>' : '') +
            '<div class="field"><label>密码</label><input id="auth-password" type="password" autocomplete="current-password" placeholder="请输入密码"></div>' +
            '<div class="form-error" id="auth-error"></div>' +
            '<button type="submit" class="btn primary block">' + (state.authTab === 'login' ? '登录' : '注册并进入') + '</button>' +
          '</form>' +
        '</div>' +
        '<div class="auth-foot">数据保存在当前设备中 · 无需联网</div>' +
      '</div>';
  }

  /* ---------------- Navigation ---------------- */

  function navHTML() {
    function item(key, label, icon) {
      return '<button class="nav-item ' + (state.view === key ? 'active' : '') + '" data-nav="' + key + '">' +
        icon + '<span>' + label + '</span></button>';
    }
    return item('home', '首页', ICON.home) + item('hub', '功能', ICON.grid) +
      '<button class="nav-add" data-action="add-item" aria-label="添加物品">' + ICON.plus + '</button>' +
      item('device', '联动', ICON.signal) + item('profile', '我的', ICON.user);
  }

  function renderApp(forceTop) {
    const scroller = $('#app-view');
    const changed = forceTop || lastView !== state.view;
    const prevScroll = (!forceTop && lastView === state.view) ? scroller.scrollTop : 0;
    $('#bottom-nav').classList.remove('hidden');
    $('#bottom-nav').innerHTML = navHTML();
    scroller.innerHTML = viewHTML();
    scroller.scrollTop = prevScroll;
    lastView = state.view;
    if (changed) animateNumbers();
  }

  function viewHTML() {
    if (state.view === 'alerts') return alertsHTML();
    if (state.view === 'guide') return guideHTML();
    if (state.view === 'community') return communityHTML();
    if (state.view === 'hub') return hubHTML();
    if (state.view === 'device') return deviceHTML();
    if (state.view === 'profile') return profileHTML();
    return homeHTML();
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 6) return '夜深了';
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  }

  function attentionItems() {
    return getUserItems().filter(function (i) {
      const k = expiryInfo(i).key;
      return k === 'expired' || k === 'danger' || k === 'warn';
    });
  }

  /* ---------------- Home ---------------- */

  function vibrate(pattern) {
    if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) { /* ignore */ } }
  }

  function spaceCellsHTML() {
    const items = getUserItems();
    const keys = db.spaceKeys || DEFAULT_SPACE_KEYS;
    const cells = keys.map(function (key) {
      const s = SPACES.find(function (x) { return x.key === key; }) || SPACES[0];
      return {
        key: s.key, label: s.label, icon: s.icon,
        count: items.filter(function (i) { return String(i.location || '').indexOf(s.key) !== -1; }).length
      };
    });

    return '<div class="panel space-map">' +
      '<div class="section-head" style="margin:0 0 4px"><h2>我的收纳地图</h2>' +
        '<button class="text-btn" data-action="edit-spaces">' + ICON.edit + ' 自定义</button></div>' +
      '<p class="map-intro">把家想象成一张地图，每格是一个常放东西的地方。轻点格子，就能看到收藏在这里的物品。</p>' +
      '<div class="space-grid">' + cells.map(function (c) {
        return '<button class="space-cell ' + (c.count ? '' : 'empty') + '" data-action="space" data-location="' + escapeHTML(c.key) + '">' +
          '<div class="space-icon">' + ICON[c.icon] + '</div>' +
          '<div class="space-name">' + escapeHTML(c.label) + '</div>' +
          '<div class="space-count">' + c.count + '<small> 件</small></div>' +
        '</button>';
      }).join('') + '</div></div>';
  }

  function achievementHTML() {
    const n = getUserItems().length;
    const levels = [
      { min: 0, name: '初出茅庐', next: 5 },
      { min: 5, name: '收纳新秀', next: 10 },
      { min: 10, name: '整理达人', next: 20 },
      { min: 20, name: '空间大师', next: null }
    ];
    let idx = 0;
    levels.forEach(function (l, i) { if (n >= l.min) idx = i; });
    const cur = levels[idx];
    const next = cur.next;
    const pct = next ? Math.round((n - cur.min) / (next - cur.min) * 100) : 100;
    return '<div class="panel achievement">' +
      '<div class="ach-badge">' + ICON.trophy + '</div>' +
      '<div class="ach-info">' +
        '<div class="ach-title">' + cur.name + '<small>等级 ' + (idx + 1) + '</small></div>' +
        '<div class="ach-sub">' + (next ? '再收纳 ' + (next - n) + ' 件即可升级' : '已达最高等级，太厉害了') + '</div>' +
        '<div class="ach-bar"><div class="ach-fill" style="width:' + pct + '%"></div></div>' +
      '</div><div class="ach-level">' + n + ' 件</div>' +
      '</div>';
  }

  function ringHTML(item) {
    const exp = expiryInfo(item);
    const C = 2 * Math.PI * 20;
    const colors = { fresh: '#7ba48d', soon: '#c9b06a', warn: '#d59275', danger: '#d07f72', expired: '#bf6f68', none: '#c9c3b9' };
    let ratio = 1, label = '∞', sub = '无期限', color = colors.none;
    if (item.expiryDate && item.storedAt) {
      const span = (new Date(item.expiryDate + 'T00:00:00') - new Date(item.storedAt + 'T00:00:00')) / 86400000;
      const remain = exp.days;
      ratio = span > 0 ? Math.max(0, Math.min(1, remain / span)) : 0;
      label = remain < 0 ? String(Math.abs(remain)) : String(remain);
      sub = remain < 0 ? '已过期' : '天';
      color = colors[exp.key];
    }
    const offset = C * (1 - ratio);
    return '<div class="ring-wrap ' + (exp.key === 'none' ? 'none' : '') + '">' +
      '<svg class="ring" viewBox="0 0 50 50">' +
        '<circle class="ring-track" cx="25" cy="25" r="20"></circle>' +
        '<circle class="ring-value" cx="25" cy="25" r="20" stroke="' + color + '" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '"></circle>' +
      '</svg>' +
      '<div class="ring-label" style="color:' + color + '">' + label + '<small>' + sub + '</small></div>' +
      '</div>';
  }

  function animateNumbers() {
    $$('.hstat-num[data-count]').forEach(function (el) {
      const target = parseInt(el.dataset.count, 10) || 0;
      if (!target) { el.textContent = '0'; return; }
      const start = performance.now();
      const duration = 720;
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function celebrate(message) {
    vibrate([12, 40, 18]);
    const root = $('#overlay-root');
    if (!root) return;
    const wrap = document.createElement('div');
    wrap.className = 'celebrate';
    const palette = ['#7ba48d', '#d59275', '#e8cd93', '#a8c3b1', '#f0d9c8'];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('i');
      s.className = 'spark';
      const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.3;
      const dist = 70 + Math.random() * 90;
      s.style.setProperty('--dx', (Math.cos(angle) * dist).toFixed(0) + 'px');
      s.style.setProperty('--dy', (Math.sin(angle) * dist).toFixed(0) + 'px');
      s.style.setProperty('--rot', Math.round(Math.random() * 360) + 'deg');
      s.style.background = palette[i % palette.length];
      s.style.animationDelay = (Math.random() * 0.12).toFixed(2) + 's';
      wrap.appendChild(s);
    }
    const pop = document.createElement('div');
    pop.className = 'success-pop';
    pop.innerHTML = '<div class="check">✓</div><b>' + escapeHTML(message || '收纳成功') + '</b><p>又一件物品找到家了</p>';
    wrap.appendChild(pop);
    root.appendChild(wrap);
    setTimeout(function () { wrap.remove(); }, 1600);
  }

  function homeHTML() {
    const user = currentUser();
    const name = (user.profile && user.profile.name) || user.username;
    const items = getUserItems();
    const cats = new Set(items.map(function (i) { return i.category; })).size;

    return '' +
      '<div class="page">' +
        '<div class="hero">' +
          '<div class="hero-top"><div><div class="hero-greeting">' + greeting() + '</div>' +
            '<div class="hero-name">' + escapeHTML(name) + '</div></div>' +
            '<div class="hero-avatar">' + escapeHTML(name.charAt(0).toUpperCase()) + '</div></div>' +
          '<div class="hero-stats">' +
            '<div class="hstat"><div class="hstat-num" data-count="' + items.length + '">0</div><div class="hstat-label">已收纳物品</div></div>' +
            '<div class="hstat alert" data-nav="alerts" style="cursor:pointer"><div class="hstat-num" data-count="' + attentionItems().length + '">0</div><div class="hstat-label">需要关注 ›</div></div>' +
            '<div class="hstat"><div class="hstat-num" data-count="' + cats + '">0</div><div class="hstat-label">物品分类</div></div>' +
          '</div>' +
        '</div>' +
        '<div class="search-feature">' +
          '<div class="sf-title">' + ICON.search + '<span>搜索我的物品</span></div>' +
          '<div class="search-bar home-search">' +
            '<input id="search-input" placeholder="名称 / 位置 / 备注 / 分类" value="' + escapeHTML(state.search) + '">' +
            '<button class="search-find" data-action="show-hub" title="功能中心">' + ICON.grid + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="items-section">' +
          '<div class="section-head items-section-head">' +
            '<h2>我的物品 <em class="count-pill">' + items.length + ' 件</em></h2>' +
            '<button class="items-panel-head text-btn" data-action="toggle-items">' + (state.itemsOpen ? '收起 ‹' : '展开 ›') + '</button>' +
          '</div>' +
          (state.itemsOpen ?
            '<div class="panel items-panel">' +
              '<div class="chips">' +
                chip('all', '全部') + chip('attention', '临期提醒') + chip('expired', '已过期') + chip('none', '无保质期') +
              '</div>' +
              '<div id="list-area">' + listHTML() + '</div>' +
            '</div>' : '') +
        '</div>' +
        spaceCellsHTML() +
        achievementHTML() +
      '</div>';
  }

  function chip(value, label) {
    return '<button class="chip ' + (state.filter === value ? 'active' : '') + '" data-action="filter" data-value="' + value + '">' + label + '</button>';
  }

  function sortedItems(items) {
    const rank = { expired: 0, danger: 1, warn: 2, soon: 3, fresh: 4, none: 5 };
    return items.slice().sort(function (a, b) {
      const ea = expiryInfo(a), eb = expiryInfo(b);
      if (rank[ea.key] !== rank[eb.key]) return rank[ea.key] - rank[eb.key];
      if (ea.days !== null && eb.days !== null && ea.days !== eb.days) return ea.days - eb.days;
      return String(b.storedAt || '').localeCompare(String(a.storedAt || ''));
    });
  }

  function visibleItems() {
    let list = sortedItems(getUserItems());
    const q = state.search.trim().toLowerCase();
    if (q) {
      list = list.filter(function (i) {
        return [i.name, i.location, i.notes, catOf(i.category).label].join(' ').toLowerCase().indexOf(q) !== -1;
      });
    }
    if (state.filter === 'attention') {
      list = list.filter(function (i) { return ['expired', 'danger', 'warn'].indexOf(expiryInfo(i).key) !== -1; });
    } else if (state.filter === 'expired') {
      list = list.filter(function (i) { return expiryInfo(i).key === 'expired'; });
    } else if (state.filter === 'none') {
      list = list.filter(function (i) { return !i.expiryDate; });
    }
    return list;
  }

  function listHTML() {
    const list = visibleItems();
    const all = getUserItems();
    if (!list.length) {
      const emptyAll = all.length === 0;
      return '<div class="empty"><div class="empty-orb">' + ICON.box + '</div>' +
        '<h3>' + (emptyAll ? '还没有收纳物品' : '没有符合条件的物品') + '</h3>' +
        '<p>' + (emptyAll ? '点击下方 + 按钮，记录第一件物品' : '试试更换搜索词或筛选条件') + '</p>' +
        (emptyAll ? '<button class="btn soft" data-action="sample">载入示例数据</button>' : '') + '</div>';
    }
    return '<div class="item-list">' + list.map(itemCard).join('') + '</div>';
  }

  function itemCard(item) {
    const cat = catOf(item.category);
    const exp = expiryInfo(item);
    const urgent = exp.key === 'expired' || exp.key === 'danger';
    return '' +
      '<article class="item-card" data-card="' + item.id + '">' +
        (item.photo ? '<img class="item-photo" src="' + item.photo + '" alt="物品照片">' : '') +
        '<div class="card-main">' +
          '<div style="flex:1;min-width:0">' +
            '<div class="item-top"><h3 class="item-title">' + escapeHTML(item.name) + '</h3>' +
              '<div class="item-actions">' +
                '<button class="icon-btn" data-action="find-item" data-id="' + item.id + '" title="一键查找">' + ICON.pin + '</button>' +
                '<button class="icon-btn" data-action="edit-item" data-id="' + item.id + '">' + ICON.edit + '</button>' +
                '<button class="icon-btn" data-action="delete-item" data-id="' + item.id + '">' + ICON.trash + '</button>' +
              '</div>' +
            '</div>' +
            '<div class="item-meta">' +
              '<span class="meta-pill"><i class="cat-dot" style="background:' + cat.color + '"></i>' + escapeHTML(cat.label) + '</span>' +
              '<span class="meta-pill">' + ICON.calendar + escapeHTML(formatDate(item.storedAt)) + ' 收纳</span>' +
              '<span class="meta-pill">' + ICON.pin + escapeHTML(item.location || '未填写') + '</span>' +
            '</div>' +
          '</div>' +
          ringHTML(item) +
        '</div>' +
        '<div class="card-more"><div class="more-grid">' +
          '<div class="more-cell"><dt>收纳日期</dt><dd>' + formatDate(item.storedAt) + '</dd></div>' +
          '<div class="more-cell"><dt>数量</dt><dd>' + escapeHTML(item.quantity || 1) + '</dd></div>' +
          '<div class="more-cell"><dt>到期日期</dt><dd>' + (item.expiryDate ? formatDate(item.expiryDate) : '无保质期') + '</dd></div>' +
          '<div class="more-cell"><dt>所属分类</dt><dd>' + escapeHTML(cat.label) + '</dd></div>' +
        '</div>' +
        (item.notes ? '<p class="item-note">' + escapeHTML(item.notes) + '</p>' : '') +
        '</div>' +
        '<div class="item-foot">' +
          '<span class="expiry ' + exp.key + '">' + (urgent ? ICON.alert : ICON.clock) + escapeHTML(exp.label) + '</span>' +
          '<span class="expand-hint">轻点卡片展开详情</span>' +
        '</div>' +
      '</article>';
  }

  function openSpaceEditor() {
    const keys = db.spaceKeys || DEFAULT_SPACE_KEYS;
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>自定义收纳地图</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<p class="sheet-tip">系统提供常用地点预设，选择你想显示在首页的格子（至少 3 个），物品会按存放位置自动归类。</p>' +
        '<div class="space-editor">' + SPACES.map(function (s) {
          const on = keys.indexOf(s.key) !== -1;
          return '<button class="space-opt ' + (on ? 'on' : '') + '" data-action="toggle-space" data-key="' + escapeHTML(s.key) + '">' +
            ICON[s.icon] + '<span>' + escapeHTML(s.label) + '</span>' + (on ? '<i>✓</i>' : '') + '</button>';
        }).join('') + '</div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="reset-spaces">恢复默认</button>' +
          '<button class="btn primary" data-action="close-sheet">完成</button></div>' +
      '</div></div>';
  }

  function openDeviceEditor(id) {
    const d = db.devices.find(function (x) { return x.id === id; });
    if (!d) return;
    const animal = d.animal || 'cat';
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>自定义定位标签</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>标签名称</label><input id="dev-name" value="' + escapeHTML(d.name) + '" maxlength="20" placeholder="给标签起个名字"></div>' +
        '<div class="field"><label>选择动物形象</label>' +
          '<div class="animal-picker">' + ANIMAL_CHOICES.map(function (a) {
            return '<label class="animal-opt"><input type="radio" name="dev-animal" value="' + a.key + '" ' + (animal === a.key ? 'checked' : '') + '>' +
              '<span>' + ICON['a_' + a.key] + '<small>' + a.label + '</small></span></label>';
          }).join('') + '</div>' +
        '</div>' +
        '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-device" data-id="' + d.id + '">保存</button></div>' +
      '</div></div>';
    const hidden = document.createElement('input');
    hidden.type = 'hidden'; hidden.id = 'dev-animal'; hidden.value = animal;
    $('.sheet').appendChild(hidden);
    $$('.animal-opt input').forEach(function (r) {
      r.addEventListener('change', function () { hidden.value = r.value; });
    });
  }

  /* ---------------- Alerts & Guide ---------------- */

  function alertsHTML() {
    const list = sortedItems(attentionItems());
    return '<div class="page">' +
      '<div class="section-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="back">' + ICON.back + '</button>' +
        '<h2 style="flex:1;margin-left:6px">到期提醒</h2><span>' + list.length + ' 件</span></div>' +
      (list.length ? '<div class="alert-banner">' + ICON.alert + '<div><b>这些物品需要留意</b><span>临期与过期物品会自动排在最前</span></div></div>' : '') +
      '<div id="list-area">' + (list.length
        ? '<div class="item-list">' + list.map(itemCard).join('') + '</div>'
        : '<div class="empty"><div class="empty-orb">' + ICON.bell + '</div><h3>暂时没有需要提醒的物品</h3><p>有保质期的物品临近到期时会显示在这里</p></div>') +
      '</div></div>';
  }

  function guideHTML() {
    return '<div class="page">' +
      '<div class="section-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="back">' + ICON.back + '</button>' +
        '<h2 style="flex:1;margin-left:6px">使用指南</h2></div>' +
      '<div class="guide-hero"><h1>轻松上手</h1><p>四步掌握，记录收纳更省心</p></div>' +
      step('1', '添加物品', '点击底部 + 按钮，可拍照记录外观，填写名称、分类、数量和存放位置。') +
      step('2', '随时查看', '首页展示收纳日期、位置与备注，支持搜索和按状态筛选。') +
      step('3', '社区交流', '在社区发布动态、和其他用户聊天，交流收纳心得。') +
      step('4', '设备联动', '绑定定位标签后可一键查找、离位提醒，并返回时自动更新收纳时间。') +
      '<h3 class="card-title">颜色说明</h3>' +
      '<div class="legend">' +
        '<span class="expiry fresh">绿色 · 新鲜</span><span class="expiry soon">浅黄 · 30 天内</span>' +
        '<span class="expiry warn">橙色 · 7 天内</span><span class="expiry danger">红色 · 3 天内</span>' +
        '<span class="expiry expired">深红 · 已过期</span><span class="expiry none">灰色 · 无保质期</span>' +
      '</div></div>';
  }

  function step(num, title, desc) {
    return '<div class="step"><div class="step-num">' + num + '</div><div><h3>' + title + '</h3><p>' + desc + '</p></div></div>';
  }

  /* ---------------- Function Hub ---------------- */

  const HUB_FEATURES = [
    { key: 'feed', label: '社区动态', desc: '看看大家的收纳灵感', icon: 'users', nav: 'community', tab: 'feed', color: 'mint' },
    { key: 'chat', label: '消息聊天', desc: '和同好交流心得', icon: 'comment', nav: 'community', tab: 'chat', color: 'clay' },
    { key: 'items', label: '我的物品', desc: '查看全部收纳记录', icon: 'box', nav: 'home', color: 'mint' },
    { key: 'map', label: '收纳地图', desc: '按位置快速找东西', icon: 'pin', nav: 'home', tab: 'map', color: 'clay' },
    { key: 'device', label: '设备联动', desc: '定位标签一键查找', icon: 'signal', nav: 'device', color: 'mint' },
    { key: 'alerts', label: '到期提醒', desc: '临期物品优先处理', icon: 'bell', nav: 'alerts', color: 'clay' },
    { key: 'guide', label: '使用指南', desc: '第一次用也不迷茫', icon: 'book', nav: 'guide', color: 'mint' },
    { key: 'profile', label: '个人设置', desc: '资料、偏好与地图配置', icon: 'user', nav: 'profile', color: 'clay' }
  ];

  function hubHTML() {
    const q = (state.hubSearch || '').trim().toLowerCase();
    const list = q ? HUB_FEATURES.filter(function (f) {
      return (f.label + f.desc + f.key).toLowerCase().indexOf(q) !== -1;
    }) : HUB_FEATURES;
    return '<div class="page hub-page">' +
      '<div class="hub-hero">' + ICON.grid + '<div><h1>功能中心</h1><p>所有功能都在这里，搜一下就能到</p></div></div>' +
      '<div class="search-bar hub-search">' + ICON.search +
        '<input id="hub-search-input" placeholder="搜索功能，如「查找」「提醒」" value="' + escapeHTML(state.hubSearch || '') + '">' +
        '<button class="search-find" data-action="clear-hub-search">✕</button></div>' +
      '<div class="hub-grid">' + list.map(function (f) {
        return '<button class="hub-tile ' + f.color + '" data-action="hub-go" data-nav-target="' + f.nav + '" data-tab="' + (f.tab || '') + '">' +
          '<span class="hub-ico">' + (ICON[f.icon] || ICON.grid) + '</span>' +
          '<b>' + escapeHTML(f.label) + '</b><small>' + escapeHTML(f.desc) + '</small>' +
        '</button>';
      }).join('') + '</div>' +
      (list.length ? '' : '<div class="empty"><h3>没有找到相关功能</h3><p>试试「查找」「地图」「提醒」</p></div>') +
      '<button class="hub-community-entry" data-action="hub-go" data-nav-target="community" data-tab="feed">' +
        '<span class="hub-ico">' + ICON.users + '</span>' +
        '<span><b>社区一角</b><small>看看大家的收纳灵感与最新动态</small></span>' +
        '<span class="hub-arrow">›</span>' +
      '</button>' +
    '</div>';
  }

  /* ---------------- Community ---------------- */

  function communityHTML() {
    return '<div class="page">' +
      '<div class="section-head community-head" style="margin-top:12px">' +
        '<button class="icon-btn" data-action="back" title="返回">' + ICON.back + '</button>' +
        '<h2 style="flex:1;margin-left:8px">社区</h2>' +
        '<button class="icon-btn" data-action="back" title="关闭">' + ICON.close + '</button>' +
      '</div>' +
      '<p class="community-sub">和收纳同好交流，看看大家的新鲜动态</p>' +
      '<div class="section-head mini-head"><h3>消息 · 聊天</h3><span>点开就能聊</span></div>' +
      '<div class="chat-list-panel">' + chatListHTML() + '</div>' +
      '<div class="section-head mini-head"><h3>社区动态</h3><span>最新分享</span></div>' +
      '<div id="community-content">' + feedHTML() + '</div>' +
      '<button class="fab-post" data-action="new-post">' + ICON.plus + '</button>' +
      '</div>';
  }

  function feedHTML() {
    const posts = db.posts.slice().reverse();
    if (!posts.length) {
      return '<div class="empty"><div class="empty-orb">' + ICON.users + '</div><h3>还没有动态</h3><p>点击右下角按钮发布第一条</p></div>';
    }
    return posts.map(function (p) {
      return '<article class="post-card">' +
        '<div class="post-head"><div class="post-avatar ' + (p.tone || '') + '">' + escapeHTML(p.avatar) + '</div>' +
          '<div><div class="post-name">' + escapeHTML(p.name) + '</div><div class="post-time">' + escapeHTML(p.time) + '</div></div>' +
          (p.tag ? '<span class="post-tag">' + escapeHTML(p.tag) + '</span>' : '') + '</div>' +
        '<p class="post-text">' + escapeHTML(p.text) + '</p>' +
        (p.photo ? '<img class="post-img" src="' + p.photo + '" alt="动态图片">' : '') +
        '<div class="post-actions">' +
          '<button data-action="like" data-id="' + p.id + '" class="' + (p.liked ? 'liked' : '') + '">' + ICON.heart + (p.likes || 0) + '</button>' +
          '<button data-action="comment-post" data-id="' + p.id + '">' + ICON.comment + ' 评论</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function chatListHTML() {
    return CHATS.map(function (c) {
      const msgs = db.messages[c.id] || (DEMO_MESSAGES[c.id] || []);
      const last = msgs.length ? msgs[msgs.length - 1].text : '开始聊天吧';
      return '<div class="chat-row" data-action="open-chat" data-id="' + c.id + '" style="cursor:pointer">' +
        '<div class="chat-avatar ' + (c.tone || '') + '">' + escapeHTML(c.avatar) + '</div>' +
        '<div class="chat-info"><b>' + escapeHTML(c.name) + '</b><p>' + escapeHTML(last) + '</p></div>' +
        '<span class="chat-time">' + (msgs.length ? escapeHTML(msgs[msgs.length - 1].time) : '') + '</span>' +
      '</div>';
    }).join('');
  }

  function openChat(id) {
    const chat = CHATS.find(function (c) { return c.id === id; });
    if (!chat) return;
    state.chatId = id;
    if (!db.messages[id]) db.messages[id] = (DEMO_MESSAGES[id] || []).slice();
    closeSheet();
    $('#overlay-root').innerHTML =
      '<div class="full-mask">' +
        '<div class="full-head"><button class="back" data-action="close-chat">' + ICON.back + '</button>' +
          '<h2>' + escapeHTML(chat.name) + '</h2></div>' +
        '<div class="chat-body" id="chat-body"></div>' +
        '<form class="chat-input" id="chat-form">' +
          '<input id="chat-text" placeholder="说点什么..." autocomplete="off">' +
          '<button type="submit">' + ICON.send + '</button>' +
        '</form>' +
      '</div>';
    renderChatBody();
  }

  function renderChatBody() {
    const body = $('#chat-body');
    if (!body) return;
    const msgs = db.messages[state.chatId] || [];
    body.innerHTML = msgs.map(function (m) {
      return '<div class="msg ' + (m.from === 'mine' ? 'mine' : '') + '">' +
        (m.name && m.from !== 'mine' ? '<b style="font-size:11px;opacity:.7">' + escapeHTML(m.name) + '　</b>' : '') +
        escapeHTML(m.text) + '</div>';
    }).join('') + '<div class="msg-time">' + (msgs.length ? escapeHTML(msgs[0].time) : '今天') + '</div>';
    body.scrollTop = body.scrollHeight;
  }

  function autoReply(chatId) {
    const replies = [
      '这个我也遇到过，后来分类放就好多了～',
      '好主意，我也要试试！',
      '可以试试定位标签联动，找东西超方便',
      '我一般每周整理一次，效果不错',
      '哈哈说得对，感谢分享！'
    ];
    setTimeout(function () {
      if (!db.messages[chatId]) db.messages[chatId] = [];
      db.messages[chatId].push({
        from: 'them', text: replies[Math.floor(Math.random() * replies.length)], time: nowTime()
      });
      saveDB();
      if (state.chatId === chatId) renderChatBody();
      renderApp();
    }, 900);
  }

  function publishPost(text, photo) {
    const user = currentUser();
    const name = (user.profile && user.profile.name) || user.username;
    db.posts.push({
      id: uid(), name: name, avatar: name.charAt(0).toUpperCase(), tone: '',
      time: '刚刚', tag: '我的分享', text: text, likes: 0, photo: photo || ''
    });
    saveDB();
    closeOverlay();
    toast('动态已发布');
    renderApp(true);
  }

  function openPostEditor() {
    $('#overlay-root').innerHTML =
      '<div class="full-mask">' +
        '<div class="full-head"><button class="back" data-action="close-overlay">' + ICON.back + '</button>' +
          '<h2>发布动态</h2><button class="btn primary sm" data-action="submit-post" style="padding:7px 14px">发布</button></div>' +
        '<div style="padding:18px">' +
          '<form id="post-form">' +
            '<div class="photo-field">' +
              '<div class="photo-preview" id="post-photo-preview">' + ICON.camera + '</div>' +
              '<div class="photo-btns">' +
                '<button type="button" data-action="take-photo" data-target="post">拍照</button>' +
                '<button type="button" data-action="pick-photo" data-target="post">相册选择</button>' +
              '</div>' +
              '<input type="hidden" id="post-photo" value="">' +
            '</div>' +
            '<div class="field"><label>分享内容</label>' +
              '<textarea id="post-text" rows="5" maxlength="300" placeholder="分享你的收纳心得..."></textarea></div>' +
          '</form>' +
        '</div>' +
      '</div>';
  }

  /* ---------------- Device linkage ---------------- */

  function ensureDevices() {
    const user = currentUser();
    if (!db.devices.some(function (d) { return d.userId === user.id; })) {
      db.devices.push(
        { id: uid(), userId: user.id, name: '收纳箱 A 标签', animal: 'cat', itemId: null, battery: 82, signal: 3, zone: '储物间', online: true, autoRecord: true, awayAlert: true },
        { id: uid(), userId: user.id, name: '冰箱标签', animal: 'rabbit', itemId: null, battery: 64, signal: 4, zone: '厨房', online: true, autoRecord: true, awayAlert: false }
      );
      saveDB();
    }
  }

  function userDevices() {
    const user = currentUser();
    return user ? db.devices.filter(function (d) { return d.userId === user.id; }) : [];
  }

  function getUserSpace() {
    const user = currentUser();
    if (user && user.currentSpace) return user.currentSpace;
    const b = HIFA_BUILDINGS[5];
    return { building: b.name, floor: '2层', room: '201', beacon: 'HIFA-6', lat: b.lat, lng: b.lng };
  }

  function getUserSchool() {
    const user = currentUser();
    const name = user && user.school && (user.school.name || user.school);
    return SCHOOLS.find(function (s) { return s.name === name; }) || SCHOOLS[0];
  }

  function currentSpaces() {
    return getUserSchool().buildings.map(function (b) {
      return {
        building: b.name, floor: '2层', room: '201',
        beacon: 'HIFA-' + b.name.replace(/[^0-9A-Za-z]/g, ''),
        lat: b.lat, lng: b.lng, approx: b.approx
      };
    });
  }

  function buildingOptions() {
    return getUserSchool().buildings.map(function (b) { return b.name; });
  }

  function spaceLabel(space) {
    return space.building + ' · ' + space.floor + ' · ' + space.room;
  }

  function nearbyItems(space) {
    return getUserItems().filter(function (i) {
      const loc = String(i.location || '');
      return loc.indexOf(space.building) !== -1 || loc.indexOf(space.room) !== -1 || loc.indexOf(space.floor) !== -1;
    });
  }

  function currentSpaceHTML() {
    const space = getUserSpace();
    const school = getUserSchool();
    const nearby = nearbyItems(space);
    return '<div class="space-now">' +
      '<div class="sn-head"><span class="sn-title">' + ICON.pin + ' 当前所在空间</span>' +
        '<button class="loc-toggle ' + (db.locationEnabled ? 'on' : '') + '" data-action="toggle-location" title="开启/关闭定位">' +
          '<i></i>' + (db.locationEnabled ? '定位已开' : '定位已关') + '</button></div>' +
      (db.locationEnabled && school ? '<div class="sn-school">' + ICON.homePin + '<span>已绑定 ' + escapeHTML(school.name) + ' · ' + escapeHTML(school.address) + '</span></div>' : '') +
      (!db.locationEnabled ? '<p class="loc-off-tip">定位已关闭，可手动选择空间；开启后将自动检索当前楼栋。</p>' : '') +
      '<div class="sn-place">' + escapeHTML(spaceLabel(space)) + '</div>' +
      (space.approx ? '<div class="sn-approx">该楼栋为校内示意坐标，精确楼层需蓝牙信标</div>' : '') +
      '<div class="sn-meta"><span>信标 ' + escapeHTML(space.beacon) + '</span><span>附近物品 ' + nearby.length + ' 件</span></div>' +
      '<div class="sn-actions">' +
        '<button class="btn soft" id="space-detect-btn" data-action="detect-space">自动检索位置</button>' +
        '<button class="btn ghost" data-action="open-space-picker">手动选择</button>' +
        '<button class="btn ghost" data-action="bind-school">' + (school ? '切换学校' : '绑定学校') + '</button>' +
      '</div>' +
      (nearby.length ? '<div class="sn-items">' + nearby.slice(0, 3).map(function (i) {
        return '<span>' + escapeHTML(i.name) + '</span>';
      }).join('') + '</div>' : '') +
      '</div>';
  }

  function distanceKm(lat1, lng1, lat2, lng2) {
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * 6371 * Math.asin(Math.sqrt(a));
  }

  function wgs84ToGcj02(lat, lng) {
    function outOfChina(la, lo) { return lo < 73.66 || lo > 135.05 || la < 3.86 || la > 53.55; }
    function transformLat(x, y) {
      let ret = -100 + 2*x + 3*y + .2*y*y + .1*x*y + .2*Math.sqrt(Math.abs(x));
      ret += (20*Math.sin(6*x*Math.PI) + 20*Math.sin(2*x*Math.PI)) * 2 / 3;
      ret += (20*Math.sin(y*Math.PI) + 40*Math.sin(y/3*Math.PI)) * 2 / 3;
      ret += (160*Math.sin(y/12*Math.PI) + 320*Math.sin(y*Math.PI/30)) * 2 / 3;
      return ret;
    }
    function transformLng(x, y) {
      let ret = 300 + x + 2*y + .1*x*x + .1*x*y + .1*Math.sqrt(Math.abs(x));
      ret += (20*Math.sin(6*x*Math.PI) + 20*Math.sin(2*x*Math.PI)) * 2 / 3;
      ret += (20*Math.sin(x*Math.PI) + 40*Math.sin(x/3*Math.PI)) * 2 / 3;
      ret += (150*Math.sin(x/12*Math.PI) + 300*Math.sin(x/30*Math.PI)) * 2 / 3;
      return ret;
    }
    if (outOfChina(lat, lng)) return { lat: lat, lng: lng };
    const a = 6378245.0, ee = 0.00669342162296594323;
    const dLat = transformLat(lng - 105.0, lat - 35.0);
    const dLng = transformLng(lng - 105.0, lat - 35.0);
    const radLat = lat / 180.0 * Math.PI;
    let magic = Math.sin(radLat); magic = 1 - ee * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    return {
      lat: lat + (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI),
      lng: lng + (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI)
    };
  }

  function nearestBuilding(lat, lng) {
    const school = getUserSchool();
    let best = school.buildings[0], bestKm = Infinity;
    school.buildings.forEach(function (b) {
      const km = distanceKm(lat, lng, b.lat, b.lng);
      if (km < bestKm) { bestKm = km; best = b; }
    });
    return { building: best, km: bestKm };
  }

  function autoDetectSpace(done) {
    const user = currentUser();
    if (!user) return;
    if (!db.locationEnabled) {
      toast('定位已关闭，请在联动页开启后再检索', 'warn');
      return;
    }
    const school = getUserSchool();
    function apply(b, prefix) {
      user.currentSpace = {
        building: b.name, floor: '2层', room: '201',
        beacon: 'HIFA-' + b.name.replace(/[^0-9A-Za-z]/g, ''),
        lat: b.lat, lng: b.lng, approx: b.approx, school: school.name
      };
      saveDB();
      toast(prefix + b.name + (b.approx ? '（示意坐标）' : ''));
      renderApp(true);
      if (typeof done === 'function') done();
    }
    if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
      setTimeout(function () { apply(school.buildings[5], '已通过校园信标检索到 '); }, 700);
      return;
    }
    navigator.geolocation.getCurrentPosition(function (pos) {
      if (!pos || !pos.coords) return;
      const gcj = wgs84ToGcj02(pos.coords.latitude, pos.coords.longitude);
      const km = distanceKm(gcj.lat, gcj.lng, school.center.lat, school.center.lng);
      if (km * 1000 > school.radius) {
        toast('当前不在' + school.short + '校园范围内（距中心 ' + Math.round(km * 1000) + ' 米）');
        return;
      }
      const near = nearestBuilding(gcj.lat, gcj.lng);
      apply(near.building, '已进入' + school.short + '，距你最近的是');
    }, function () {
      toast('未能获取定位权限，已保留上次位置；可在浏览器设置中允许定位，或手动选择空间', 'warn');
    }, { enableHighAccuracy: true, timeout: 4000, maximumAge: 30000 });
  }

  function mapConfig() {
    return db.mapConfig && db.mapConfig.key ? db.mapConfig : null;
  }

  let amapPromise = null;
  function loadAMap() {
    if (wamap()) return Promise.resolve(wamap());
    const cfg = mapConfig();
    if (!cfg) return Promise.reject(new Error('NO_KEY'));
    if (!amapPromise) {
      amapPromise = new Promise(function (resolve, reject) {
        window._AMapSecurityConfig = { securityJsCode: cfg.securityCode || '' };
        function start() {
          if (!window.AMapLoader) { reject(new Error('LOADER_MISSING')); return; }
          window.AMapLoader.load({ key: cfg.key, version: '2.0', plugins: [] })
            .then(resolve).catch(reject);
        }
        if (window.AMapLoader) { start(); return; }
        const s = document.createElement('script');
        s.src = 'https://webapi.amap.com/loader.js';
        s.onload = start;
        s.onerror = function () { reject(new Error('NETWORK')); };
        document.head.appendChild(s);
      });
    }
    return amapPromise;
  }

  function wamap() { return window.AMap || null; }
  let activeRealMap = null;
  function destroyRealMap() {
    if (activeRealMap && typeof activeRealMap.destroy === 'function') {
      try { activeRealMap.destroy(); } catch (e) { /* ignore */ }
    }
    activeRealMap = null;
  }

  function deviceSearchResultsHTML(query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return '<div class="is-empty">输入物品名称或存放位置，搜索结果可直接一键查找</div>';
    const list = getUserItems().filter(function (i) {
      return [i.name, i.location, i.notes].join(' ').toLowerCase().indexOf(q) !== -1;
    });
    if (!list.length) return '<div class="is-empty">没有找到与「' + escapeHTML(query) + '」相关的物品</div>';
    return list.slice(0, 8).map(function (i) {
      return '<div class="is-row"><div class="is-ico">' + ICON.tag + '</div>' +
        '<div class="is-info"><b>' + escapeHTML(i.name) + '</b><span>' + escapeHTML(i.location || '未填写位置') + '</span></div>' +
        '<button class="btn soft" data-action="find-item" data-id="' + i.id + '">一键查找</button></div>';
    }).join('');
  }

  function deviceSearchHTML() {
    const query = state.deviceSearch || '';
    return '<div class="item-search">' +
      '<div class="is-title">' + ICON.search + '<b>搜索我的物品</b><span>找到后可一键定位</span></div>' +
      '<div class="is-field">' + ICON.search +
        '<input id="device-item-search" value="' + escapeHTML(query) + '" placeholder="输入物品名称或位置">' +
        '<button class="is-clear" data-action="clear-device-search" aria-label="清空">✕</button></div>' +
      '<div class="is-results" id="device-search-results">' + deviceSearchResultsHTML(query) + '</div>' +
      '</div>';
  }

  function showMapPlanSheet() {
    const cfg = mapConfig();
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet map-plan-sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>高德地图 · 真实中国地图</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="mp-body">' +
          '<div class="amap-status ' + (cfg ? 'on' : '') + '"><i></i>' +
            (cfg ? '已配置 Key：' + escapeHTML(cfg.key.slice(0, 6) + '****' + cfg.key.slice(-4)) : '尚未配置 Key，当前使用示意地图') +
          '</div>' +
          '<button class="btn primary block" data-action="open-map-config">' + (cfg ? '修改高德配置' : '配置高德 Key') + '</button>' +
          '<p class="mp-note">高德 Key 需到 https://console.amap.com 免费申请，选择「Web端(JS API)」类型并获取安全密钥 jscode。</p>' +
          MAP_SDK_PLAN.map(function (sec) {
            return '<div class="mp-sec"><h4>' + escapeHTML(sec.title) + '</h4><ol>' +
              sec.steps.map(function (s) { return '<li>' + escapeHTML(s) + '</li>'; }).join('') +
              '</ol></div>';
          }).join('') +
        '</div>' +
      '</div></div>';
  }

  function mapConfigFormHTML() {
    const cfg = mapConfig() || { key: '', securityCode: '' };
    return '<div class="field"><label>高德 Web 端 Key</label><input id="amap-key" value="' + escapeHTML(cfg.key) + '" placeholder="在 console.amap.com 申请的 JS API Key"></div>' +
      '<div class="field"><label>安全密钥 jscode</label><input id="amap-code" value="' + escapeHTML(cfg.securityCode || '') + '" placeholder="2021年12月后申请的 Key 必须填写"></div>' +
      '<p class="sheet-tip">配置仅保存在本地浏览器，请到 console.amap.com 免费申请。</p>' +
      '<div class="sheet-actions"><button class="btn ghost" data-action="show-map-plan">返回</button>' +
        '<button class="btn primary" data-action="save-map-config">保存并启用</button></div>';
  }

  function deviceHTML() {
    ensureDevices();
    const devices = userDevices();
    const items = getUserItems();
    return '<div class="page">' +
      currentSpaceHTML() +
      '<div class="section-head"><h2>我的标签</h2><span>' + devices.length + ' 个设备</span></div>' +
      devices.map(function (d) {
        const linked = items.find(function (i) { return i.id === d.itemId; });
        const bars = [1, 2, 3, 4].map(function (n) { return '<i class="' + (n <= d.signal ? 'on' : '') + '"></i>'; }).join('');
        const animal = d.animal || 'cat';
        return '<div class="device-card">' +
          '<div class="device-row"><button class="device-ico animal-ico" data-action="edit-device" data-id="' + d.id + '" title="自定义标签">' + ICON['a_' + animal] + '</button>' +
            '<div style="flex:1;min-width:0"><div class="device-name">' + escapeHTML(d.name) + '</div>' +
              '<div class="device-sub">' + (linked ? '绑定：' + escapeHTML(linked.name) : '尚未绑定物品') + ' · ' + escapeHTML(d.zone) + '</div></div>' +
            '<span class="device-status">' + (d.online ? '在线' : '离线') + '</span></div>' +
          '<div class="device-metrics">' +
            '<div class="metric"><div class="metric-label">电量 ' + d.battery + '%</div>' +
              '<div class="battery-track"><div class="battery-fill" style="width:' + d.battery + '%"></div></div></div>' +
            '<div class="metric"><div class="metric-label">信号强度</div><div class="signal-bars">' + bars + '</div></div>' +
          '</div>' +
          '<div class="device-actions">' +
            '<button class="btn soft" data-action="find-device" data-id="' + d.id + '">一键查找</button>' +
            '<button class="btn ghost" data-action="edit-device" data-id="' + d.id + '">自定义标签</button>' +
            '<button class="btn ghost" data-action="bind-device" data-id="' + d.id + '">绑定物品</button>' +
            '<button class="btn ghost" data-action="toggle-away" data-id="' + d.id + '">' + (d.awayAlert ? '离位提醒 开' : '离位提醒 关') + '</button>' +
          '</div>' +
        '</div>';
      }).join('') +
      '<div class="device-hero"><h1>设备联动</h1><p>给物品装上定位标签，找回更轻松</p><div class="device-radar"></div></div>' +
      '<div class="section-head" style="margin-top:22px"><h2>联动能力</h2><span>设备 + App</span></div>' +
      '<div class="feature-grid">' +
        feature(ICON.bell, '一键查找', 'App 呼叫标签，标签发声发光，按信号强弱找到物品。') +
        feature(ICON.homePin, '离位提醒', '物品离开设定区域时自动提醒，防止遗忘或丢失。') +
        feature(ICON.calendar, '自动记录收纳', '标签回到收纳区域时，自动更新收纳时间。') +
        feature(ICON.battery, '低电量提醒', '标签电量不足时提示更换，避免关键时刻失联。') +
      '</div>' +
      '<div class="info-card device-note" style="margin-top:16px;font-size:11px;color:var(--ink-soft);line-height:1.7">' +
        '<b>设备联动说明</b>' +
        '<p>当前为交互演示：标签状态在 App 内模拟。接入真实硬件时，标签可通过蓝牙广播自身 ID 与信号强度，网关或手机上报到服务器，再由 App 通过蓝牙 / WebSocket 接收，实现查找、离位判定与自动记录。</p>' +
        '<button class="btn ghost" data-action="show-map-plan">查看真实中国地图接入方案</button>' +
      '</div>' +
      '</div>';
  }

  function feature(icon, title, desc) {
    return '<div class="feature-card">' + icon + '<b>' + title + '</b><p>' + desc + '</p></div>';
  }

  function animalKey(item, index) {
    return ANIMAL_BY_CATEGORY[item.category] || ['cat', 'rabbit', 'bear', 'fox', 'bird', 'fish'][index % 6];
  }

  function findMapHTML(target) {
    const items = getUserItems();
    const linked = items.find(function (i) { return i.id === target.itemId; });
    const space = getUserSpace();
    const nearbyIds = nearbyItems(space).map(function (i) { return i.id; });
    const tags = items.slice(0, 8).map(function (item, idx) {
      const spot = MAP_SPOTS[idx % MAP_SPOTS.length];
      const animal = animalKey(item, idx);
      const isTarget = linked && item.id === linked.id;
      const isNear = nearbyIds.indexOf(item.id) !== -1;
      return '<button class="animal-tag ' + (isTarget ? 'target' : '') + (isNear ? ' in-space' : '') + '" data-action="find-tag" data-id="' + item.id + '" data-animal="' + animal + '" style="--x:' + spot.x + '%;--y:' + spot.y + '%;--d:' + (idx * 0.32).toFixed(2) + 's">' +
        '<span class="tag-animal">' + ICON['a_' + animal] + '</span>' +
        '<span class="tag-name">' + escapeHTML(item.name) + (isNear ? ' · 同空间' : '') + '</span>' +
      '</button>';
    }).join('');

    return '<div class="find-map" id="find-map">' +
      '<div class="map-grid"></div>' +
      '<div class="map-ring r1"></div><div class="map-ring r2"></div><div class="map-ring r3"></div>' +
      '<span class="room room-1">客厅</span><span class="room room-2">厨房</span>' +
      '<span class="room room-3">卧室</span><span class="room room-4">书房</span>' +
      '<div class="space-banner">' + ICON.homePin + '<span>当前空间：' + escapeHTML(spaceLabel(space)) + '</span></div>' +
      '<div class="map-me">' + ICON.user + '</div>' +
      (tags || '<div class="map-empty">暂无物品标签</div>') +
      '<div id="amap-container" class="amap-container hidden"></div>' +
    '</div>';
  }

  function initRealMap(target) {
    const cfg = mapConfig();
    const holder = $('#amap-container');
    if (!cfg || !holder) return;
    loadAMap().then(function (AMap) {
      const school = getUserSchool();
      const space = getUserSpace();
      const meLng = space.lng || school.center.lng, meLat = space.lat || school.center.lat;
      const map = new AMap.Map('amap-container', {
        zoom: 16, center: [meLng, meLat], viewMode: '2D', mapStyle: 'amap://styles/whitesmoke'
      });
      activeRealMap = map;
      map.addControl(new AMap.Scale());

      new AMap.Circle({
        center: [school.center.lng, school.center.lat], radius: school.radius,
        fillColor: '#7ba48d', fillOpacity: .1, strokeColor: '#2f7d6b', strokeOpacity: .6, strokeWeight: 2,
        strokeStyle: 'dashed'
      }).setMap(map);

      new AMap.Marker({
        position: [school.center.lng, school.center.lat],
        label: { content: school.name + '（校园范围 ' + school.radius + 'm）', direction: 'top' }
      }).setMap(map);

      new AMap.Marker({
        position: [meLng, meLat],
        title: '我当前所在：' + spaceLabel(space),
        label: { content: '我 · ' + spaceLabel(space), direction: 'top' }
      }).setMap(map);

      const items = getUserItems();
      const linked = items.find(function (i) { return i.id === target.itemId; });
      items.slice(0, 8).forEach(function (item, idx) {
        const animal = animalKey(item, idx);
        const angle = idx * Math.PI / 4;
        const lng = meLng + Math.cos(angle) * 0.0011;
        const lat = meLat + Math.sin(angle) * 0.0011;
        const marker = new AMap.Marker({
          position: [lng, lat], title: item.name,
          content: '<div class="amap-tag' + (linked && linked.id === item.id ? ' target' : '') + '">' +
            '<span class="amap-animal">' + ICON['a_' + animal] + '</span>' +
            '<span class="amap-name">' + escapeHTML(item.name) + '</span></div>',
          offset: new AMap.Pixel(-28, -42)
        });
        marker.on('click', function () {
          $$('.animal-tag, .amap-tag').forEach(function (t) { t.classList.remove('selected'); });
          const el = marker.getContent && marker.getContent();
          if (el && el.classList) el.classList.add('selected');
          const nameEl = $('#find-name'), subEl = $('#find-sub');
          if (nameEl) nameEl.textContent = item.name;
          if (subEl) subEl.textContent = (item.location || '未填写') + ' · 地图标签已选中';
          vibrate(10);
        });
        marker.setMap(map);
      });

      holder.classList.remove('hidden');
      $$('.find-map > :not(#amap-container)').forEach(function (el) { el.classList.add('hidden'); });
      const status = $('#find-status');
      if (status) status.textContent = '高德地图已定位';
      toast('已加载高德地图 · 当前空间 ' + spaceLabel(space));
    }).catch(function (err) {
      holder.classList.add('hidden');
      toast(err.message === 'NO_KEY' ? '未配置高德 Key，使用示意地图' : '高德地图加载失败，已回退示意地图', 'warn');
    });
  }

  function openFind(id) {
    const d = db.devices.find(function (x) { return x.id === id; });
    if (d) showFind(d);
  }

  function openItemFind(id) {
    const item = getUserItems().find(function (i) { return i.id === id; });
    if (!item) return;
    showFind({ id: 'item_' + id, name: item.name + ' · 物品查找', itemId: id, zone: item.location || '未填写位置', signal: 4 });
  }

  function showFind(d) {
    const items = getUserItems();
    const linked = items.find(function (i) { return i.id === d.itemId; });
    const animal = linked ? animalKey(linked, 0) : 'cat';
    const bars = [1, 2, 3, 4].map(function (n) { return '<i class="' + (n <= d.signal ? 'on' : '') + '"></i>'; }).join('');

    $('#overlay-root').innerHTML =
      '<div class="find-mask">' +
        '<div class="find-head">' +
          '<button class="find-back" data-action="close-overlay">' + ICON.back + '</button>' +
          '<div class="find-head-text"><h3>查找物品</h3><p>' + escapeHTML(d.name) + ' · 标签正在发声</p></div>' +
          '<span class="find-live"><i></i>LIVE</span>' +
        '</div>' +
        findMapHTML(d) +
        '<div class="find-panel">' +
          '<div class="find-target" id="find-target">' +
            '<div class="ft-animal">' + ICON['a_' + animal] + '</div>' +
            '<div class="ft-info"><b id="find-name">' + (linked ? escapeHTML(linked.name) : '未绑定物品') + '</b>' +
              '<p id="find-sub">' + escapeHTML(d.zone) + ' · 信号 ' + d.signal + '/4</p></div>' +
            '<span class="ft-state" id="find-status">正在呼叫…</span>' +
          '</div>' +
          '<div class="find-signal"><span>信号强度</span><div class="find-bars">' + bars + '</div></div>' +
          '<button class="btn primary block" data-action="close-overlay">停止查找</button>' +
        '</div>' +
      '</div>';

    vibrate([20, 60, 20]);
    setTimeout(function () {
      const s = $('#find-status');
      if (s && !s.textContent.includes('高德')) s.textContent = '标签已响铃';
    }, 1400);
    initRealMap(d);
  }

  function openBind(id) {
    const d = db.devices.find(function (x) { return x.id === id; });
    if (!d) return;
    const items = getUserItems();
    if (!items.length) { toast('请先添加物品', 'warn'); return; }
    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>绑定物品</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<div class="field"><label>选择要绑定的物品</label><select id="bind-item">' +
          items.map(function (i) {
            return '<option value="' + i.id + '" ' + (d.itemId === i.id ? 'selected' : '') + '>' + escapeHTML(i.name) + '</option>';
          }).join('') +
        '</select></div>' +
        '<div class="field"><label>收纳区域</label><input id="bind-zone" value="' + escapeHTML(d.zone) + '" placeholder="例如：储物间"></div>' +
        '<div class="sheet-actions">' +
          '<button class="btn ghost" data-action="close-sheet">取消</button>' +
          '<button class="btn primary" data-action="save-bind" data-id="' + d.id + '">保存绑定</button>' +
        '</div>' +
      '</div></div>';
  }

  /* ---------------- Camera ---------------- */

  function compressImage(src, callback) {
    const img = new Image();
    img.onload = function () {
      const max = 640;
      let w = img.width, h = img.height;
      const scale = Math.min(1, max / Math.max(w, h));
      w = Math.round(w * scale); h = Math.round(h * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = function () { toast('图片读取失败', 'error'); };
    img.src = src;
  }

  function setPhoto(target, data) {
    const hidden = $('#' + target + '-photo');
    const preview = $('#' + target + '-photo-preview');
    if (hidden) hidden.value = data;
    if (preview) preview.innerHTML = '<img src="' + data + '" alt="预览">';
    closeOverlay();
    toast('照片已添加');
  }

  function openCamera(target) {
    $('#overlay-root').innerHTML =
      '<div class="full-mask">' +
        '<div class="full-head" style="background:#2f3a34;color:#fff;border:none">' +
          '<button class="back" data-action="close-overlay" style="background:rgba(255,255,255,.12);color:#fff">' + ICON.back + '</button>' +
          '<h2>拍照</h2><span></span></div>' +
        '<div class="camera-stage">' +
          '<video id="cam-video" autoplay playsinline></video>' +
          '<div class="cam-placeholder" id="cam-placeholder">' + ICON.camera + '<p>相机启动中…</p></div>' +
        '</div>' +
        '<div class="camera-controls">' +
          '<button data-action="pick-photo" data-target="' + target + '">相册</button>' +
          '<button class="capture-btn" data-action="capture-photo" data-target="' + target + '"></button>' +
          '<button data-action="close-overlay">取消</button>' +
        '</div>' +
      '</div>';

    const video = $('#cam-video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function (stream) {
          activeStream = stream;
          video.srcObject = stream;
          const ph = $('#cam-placeholder');
          if (ph) ph.style.display = 'none';
        })
        .catch(function () {
          const ph = $('#cam-placeholder');
          if (ph) ph.innerHTML = ICON.camera + '<p>无法访问相机<br>请使用相册选择</p>';
        });
    } else {
      const ph = $('#cam-placeholder');
      if (ph) ph.innerHTML = ICON.camera + '<p>当前环境不支持相机<br>请使用相册选择</p>';
    }
  }

  function capturePhoto(target) {
    const video = $('#cam-video');
    if (!video || !video.videoWidth) { toast('相机尚未就绪，请稍候', 'warn'); return; }
    const canvas = document.createElement('canvas');
    const max = 640;
    let w = video.videoWidth, h = video.videoHeight;
    const scale = Math.min(1, max / Math.max(w, h));
    w = Math.round(w * scale); h = Math.round(h * scale);
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(video, 0, 0, w, h);
    setPhoto(target, canvas.toDataURL('image/jpeg', 0.6));
  }

  function pickPhoto(target) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (ev) { compressImage(ev.target.result, function (data) { setPhoto(target, data); }); };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  /* ---------------- Item sheet ---------------- */

  function openItemSheet(itemId) {
    const item = itemId ? getUserItems().find(function (i) { return i.id === itemId; }) : null;
    const isEdit = !!item;
    const data = item || { name: '', category: 'food', quantity: 1, location: '', storedAt: todayStr(), expiryDate: '', notes: '', photo: '' };

    $('#sheet-root').innerHTML =
      '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
        '<div class="sheet-handle"></div>' +
        '<div class="sheet-head"><h2>' + (isEdit ? '编辑物品' : '添加物品') + '</h2>' +
          '<button class="sheet-close" data-action="close-sheet">✕</button></div>' +
        '<form id="item-form">' +
          '<div class="photo-field">' +
            '<div class="photo-preview" id="item-photo-preview">' + (data.photo ? '<img src="' + data.photo + '" alt="预览">' : ICON.camera) + '</div>' +
            '<div class="photo-btns">' +
              '<button type="button" data-action="take-photo" data-target="item">拍照</button>' +
              '<button type="button" data-action="pick-photo" data-target="item">相册选择</button>' +
              '<button type="button" data-action="clear-photo" data-target="item">移除</button>' +
            '</div>' +
            '<input type="hidden" id="item-photo" value="' + (data.photo || '') + '">' +
          '</div>' +
          '<div class="field"><label>物品名称 *</label><input id="f-name" data-item-id="' + (isEdit ? item.id : '') + '" maxlength="60" placeholder="例如：牛奶、文件夹" value="' + escapeHTML(data.name) + '"></div>' +
          '<div class="form-row">' +
            '<div class="field"><label>分类</label><select id="f-category">' +
              CATEGORIES.map(function (c) {
                return '<option value="' + c.key + '" ' + (data.category === c.key ? 'selected' : '') + '>' + c.label + '</option>';
              }).join('') +
            '</select></div>' +
            '<div class="field"><label>数量</label><input id="f-quantity" type="number" min="1" step="1" value="' + escapeHTML(data.quantity || 1) + '"></div>' +
          '</div>' +
          '<div class="field"><label>存放位置</label><input id="f-location" maxlength="80" placeholder="例如：冰箱第二层" value="' + escapeHTML(data.location) + '"></div>' +
          '<div class="form-row">' +
            '<div class="field"><label>收纳日期 *</label><input id="f-stored" type="date" value="' + escapeHTML(data.storedAt) + '"><div class="hint">什么时候放进去的</div></div>' +
            '<div class="field"><label>保质期至</label><input id="f-expiry" type="date" value="' + escapeHTML(data.expiryDate) + '"><div class="hint">选填，会显示提醒</div></div>' +
          '</div>' +
          '<div class="field"><label>备注</label><textarea id="f-notes" rows="2" maxlength="300" placeholder="补充说明（选填）">' + escapeHTML(data.notes) + '</textarea></div>' +
          '<div class="form-error" id="item-error"></div>' +
          '<div class="sheet-actions">' +
            '<button type="button" class="btn ghost" data-action="close-sheet">取消</button>' +
            '<button type="submit" class="btn primary">' + (isEdit ? '保存修改' : '确认收纳') + '</button>' +
          '</div>' +
        '</form>' +
      '</div></div>';
  }

  function deleteItem(id) {
    const item = db.items.find(function (i) { return i.id === id; });
    if (!item) return;
    openConfirm('删除物品', '确定删除「' + item.name + '」吗？删除后无法恢复。', function () {
      db.items = db.items.filter(function (i) { return i.id !== id; });
      db.devices.forEach(function (d) { if (d.itemId === id) d.itemId = null; });
      saveDB();
      toast('已删除该物品');
      state.itemsOpen = true;
      renderApp(true);
    });
  }

  function loadSampleData() {
    const user = currentUser();
    const samples = [
      { name: '全脂牛奶', category: 'food', quantity: 2, location: '冰箱冷藏室', storedAt: shiftDate(-3), expiryDate: shiftDate(4), notes: '早餐搭配', photo: '' },
      { name: '维生素C片', category: 'medicine', quantity: 1, location: '客厅药箱', storedAt: shiftDate(-20), expiryDate: shiftDate(60), notes: '每天一片', photo: '' },
      { name: '防晒霜', category: 'cosmetic', quantity: 1, location: '梳妆台抽屉', storedAt: shiftDate(-100), expiryDate: shiftDate(120), notes: '', photo: '' },
      { name: '冬季围巾', category: 'clothing', quantity: 1, location: '衣柜上层', storedAt: shiftDate(-30), expiryDate: '', notes: '换季收纳', photo: '' },
      { name: '项目合同', category: 'document', quantity: 3, location: '书房文件柜', storedAt: shiftDate(-7), expiryDate: '', notes: '重要文件', photo: '' },
      { name: '充电宝', category: 'electronic', quantity: 1, location: '玄关抽屉', storedAt: shiftDate(-15), expiryDate: '', notes: '', photo: '' },
      { name: '鸡蛋', category: 'food', quantity: 10, location: '冰箱第一层', storedAt: shiftDate(-10), expiryDate: shiftDate(-2), notes: '已过期，记得清理', photo: '' }
    ];
    samples.forEach(function (s) {
      db.items.push(Object.assign({ id: uid(), userId: user.id, createdAt: new Date().toISOString() }, s));
    });
    saveDB();
    toast('已载入示例数据');
    state.itemsOpen = true;
    renderApp(true);
  }

  /* ---------------- Profile ---------------- */

  function profileHTML() {
    const user = currentUser();
    const p = user.profile || {};
    const name = p.name || user.username;
    return '<div class="page">' +
      '<div class="profile-head"><div class="profile-avatar">' + escapeHTML(name.charAt(0).toUpperCase()) + '</div>' +
        '<h2>' + escapeHTML(name) + '</h2><p>@' + escapeHTML(user.username) + '</p></div>' +
      '<form id="profile-form" class="info-card">' +
        '<div class="field"><label>昵称</label><input id="pf-name" maxlength="30" value="' + escapeHTML(p.name || '') + '"></div>' +
        '<div class="field"><label>联系方式</label><input id="pf-contact" maxlength="60" value="' + escapeHTML(p.contact || '') + '" placeholder="手机号或邮箱"></div>' +
        '<div class="field"><label>个人备注</label><textarea id="pf-bio" rows="3" maxlength="300" placeholder="关于收纳习惯的一些记录">' + escapeHTML(p.bio || '') + '</textarea></div>' +
        '<button type="submit" class="btn primary block">保存资料</button>' +
      '</form>' +
      '<button class="chat-row" data-nav="guide" style="width:100%;cursor:pointer">' +
        '<div class="chat-avatar">' + ICON.book + '</div><div class="chat-info"><b>使用指南</b><p>查看操作步骤与颜色说明</p></div><span class="chat-time">›</span></button>' +
      '<div class="info-card" style="text-align:center;color:var(--ink-soft);font-size:12px">' +
        '注册于 ' + formatDate(String(user.createdAt || '').slice(0, 10)) + ' · 已收纳 ' + getUserItems().length + ' 件物品</div>' +
      '<button class="btn ghost block" data-action="logout" style="color:#c98d86">退出登录</button>' +
      '</div>';
  }

  /* ---------------- Actions ---------------- */

  function handleAction(action, el) {
    switch (action) {
      case 'auth-tab':
        state.authTab = el.dataset.value; renderAuth(); break;
      case 'add-item': openItemSheet(); break;
      case 'edit-item': openItemSheet(el.dataset.id); break;
      case 'delete-item': deleteItem(el.dataset.id); break;
      case 'toggle-items': state.itemsOpen = !state.itemsOpen; renderApp(); break;
      case 'show-hub': state.view = 'hub'; renderApp(true); break;
      case 'hub-go':
        state.view = el.dataset.navTarget || 'hub';
        if (el.dataset.tab === 'feed' || el.dataset.tab === 'chat') state.communityTab = el.dataset.tab;
        if (el.dataset.tab === 'map') { state.view = 'home'; state.itemsOpen = true; }
        vibrate(10); renderApp(true); break;
      case 'clear-hub-search': state.hubSearch = ''; renderApp(); break;
      case 'edit-spaces': openSpaceEditor(); break;
      case 'toggle-space':
        const sk = el.dataset.key;
        const si = (db.spaceKeys || []).indexOf(sk);
        if (si >= 0) {
          if (db.spaceKeys.length <= 3) { toast('至少保留 3 个格子', 'warn'); break; }
          db.spaceKeys.splice(si, 1);
        } else db.spaceKeys.push(sk);
        saveDB(); openSpaceEditor(); break;
      case 'reset-spaces': db.spaceKeys = DEFAULT_SPACE_KEYS.slice(); saveDB(); openSpaceEditor(); toast('已恢复默认格子'); break;
      case 'edit-device': openDeviceEditor(el.dataset.id); break;
      case 'save-device':
        const ed = db.devices.find(function (d) { return d.id === el.dataset.id; });
        if (ed) {
          ed.name = $('#dev-name').value.trim() || ed.name;
          ed.animal = $('#dev-animal').value;
          saveDB(); closeSheet(); toast('标签已更新'); renderApp(true);
        }
        break;
      case 'toggle-location':
        db.locationEnabled = !db.locationEnabled; saveDB(); renderApp(true);
        toast(db.locationEnabled ? '定位已开启' : '定位已关闭'); break;
      case 'close-sheet': closeSheet(); break;
      case 'close-overlay': closeOverlay(); break;
      case 'close-chat': closeOverlay(); state.chatId = null; break;
      case 'back':
        if (state.view === 'community') state.view = 'hub';
        else state.view = (state.backTo === 'profile') ? 'profile' : 'home';
        state.communityTab = 'feed';
        renderApp(true); break;
      case 'filter':
        state.filter = el.dataset.value;
        vibrate(8);
        $$('.chip').forEach(function (c) { c.classList.toggle('active', c.dataset.value === state.filter); });
        const area = $('#list-area');
        if (area) area.innerHTML = listHTML();
        break;
      case 'space':
        state.search = el.dataset.location || '';
        state.filter = 'all';
        state.view = 'home';
        vibrate(12);
        renderApp(true);
        toast('已定位到「' + state.search + '」的物品');
        const listEl = $('#list-area');
        if (listEl && typeof listEl.scrollIntoView === 'function') {
          listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        break;
      case 'community-tab':
        state.communityTab = el.dataset.value;
        $$('.community-tabs button').forEach(function (b) { b.classList.toggle('active', b.dataset.value === state.communityTab); });
        const content = $('#community-content');
        if (content) content.innerHTML = state.communityTab === 'feed' ? feedHTML() : chatListHTML();
        const fabBtn = $('.fab-post');
        if (fabBtn) fabBtn.style.display = state.communityTab === 'feed' ? '' : 'none';
        break;
      case 'like':
        const post = db.posts.find(function (p) { return p.id === el.dataset.id; });
        if (post) { post.liked = !post.liked; post.likes = (post.likes || 0) + (post.liked ? 1 : -1); saveDB(); renderApp(); }
        break;
      case 'comment-post':
        state.communityTab = 'chat';
        state.chatId = 'c1';
        renderApp();
        openChat('c1');
        break;
      case 'open-chat': openChat(el.dataset.id); break;
      case 'new-post': openPostEditor(); break;
      case 'submit-post':
        const text = $('#post-text').value.trim();
        if (!text) { toast('请输入分享内容', 'warn'); return; }
        publishPost(text, $('#post-photo').value);
        break;
      case 'take-photo': openCamera(el.dataset.target); break;
      case 'pick-photo': pickPhoto(el.dataset.target); break;
      case 'capture-photo': capturePhoto(el.dataset.target); break;
      case 'clear-photo':
        const hp = $('#item-photo'), pp = $('#item-photo-preview');
        if (hp) hp.value = '';
        if (pp) pp.innerHTML = ICON.camera;
        break;
      case 'find-device': openFind(el.dataset.id); break;
      case 'detect-space':
        const detectBtn = $('#space-detect-btn');
        if (detectBtn) detectBtn.textContent = '检索中…';
        vibrate(15);
        autoDetectSpace();
        break;
      case 'open-space-picker':
        const cur = getUserSpace();
        function opts(list, selected) {
          return list.map(function (o) {
            return '<option value="' + escapeHTML(o) + '" ' + (o === selected ? 'selected' : '') + '>' + escapeHTML(o) + '</option>';
          }).join('');
        }
        const roomList = roomsForFloor(cur.building, cur.floor);
        const curRoom = roomList.indexOf(cur.room) !== -1 ? cur.room : roomList[0];
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
            '<div class="sheet-handle"></div>' +
            '<div class="sheet-head"><h2>手动选择空间</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
            '<p class="sheet-tip">宿舍楼共 6 层：1 层为教室与宿管，2–6 层每间房按楼层编号（如 201–224）。</p>' +
            '<div class="field"><label>楼栋</label><select id="sp-building">' + opts(buildingOptions(), cur.building) + '</select></div>' +
            '<div class="field"><label>楼层</label><select id="sp-floor">' + opts(FLOOR_OPTIONS, cur.floor) + '</select></div>' +
            '<div class="field"><label>房间 / 区域</label><select id="sp-room">' + opts(roomList, curRoom) + '</select></div>' +
            '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
              '<button class="btn primary" data-action="save-space">保存</button></div>' +
          '</div></div>';
        break;
      case 'save-space':
        const su = currentUser();
        if (su) {
          const school = getUserSchool();
          const pickedName = $('#sp-building').value;
          const picked = school.buildings.find(function (b) { return b.name === pickedName; }) || school.buildings[5];
          su.currentSpace = {
            building: picked.name, floor: $('#sp-floor').value,
            room: $('#sp-room').value, beacon: 'HIFA-' + picked.name.replace(/[^0-9A-Za-z]/g, ''),
            lat: picked.lat, lng: picked.lng, approx: picked.approx, school: school.name
          };
          saveDB(); closeSheet(); toast('当前空间已更新'); renderApp(true);
        }
        break;
      case 'bind-school':
        const bound = getUserSchool();
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
            '<div class="sheet-handle"></div>' +
            '<div class="sheet-head"><h2>绑定学校 / 校区</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
            '<p class="sheet-tip">绑定后，自动检索会优先判断你是否在该校区范围内，并列出校内楼栋。</p>' +
            '<div class="field"><label>学校 / 校区</label><select id="school-select">' +
              SCHOOLS.map(function (s) {
                return '<option value="' + escapeHTML(s.name) + '" ' + (bound && bound.name === s.name ? 'selected' : '') + '>' + escapeHTML(s.name) + '</option>';
              }).join('') +
            '</select></div>' +
            '<div class="sheet-actions"><button class="btn ghost" data-action="close-sheet">取消</button>' +
              '<button class="btn primary" data-action="save-school">绑定</button></div>' +
          '</div></div>';
        break;
      case 'save-school':
        const schoolUser = currentUser();
        const schoolName = $('#school-select').value;
        const school = SCHOOLS.find(function (s) { return s.name === schoolName; });
        if (schoolUser && school) {
          const target = HIFA_BUILDINGS[5];
          schoolUser.school = school.name;
          schoolUser.currentSpace = {
            building: target.name, floor: '2层', room: '201',
            beacon: 'HIFA-6', lat: target.lat, lng: target.lng, school: school.name
          };
          saveDB(); closeSheet(); toast('已绑定 ' + school.name); renderApp(true);
        }
        break;
      case 'find-item': openItemFind(el.dataset.id); break;
      case 'clear-device-search':
        state.deviceSearch = '';
        const deviceInput = $('#device-item-search');
        if (deviceInput) { deviceInput.value = ''; deviceInput.focus(); }
        const deviceResults = $('#device-search-results');
        if (deviceResults) deviceResults.innerHTML = deviceSearchResultsHTML('');
        break;
      case 'show-map-plan': showMapPlanSheet(); break;
      case 'open-map-config':
        $('#sheet-root').innerHTML =
          '<div class="sheet-mask" data-mask="1"><div class="sheet">' +
            '<div class="sheet-handle"></div>' +
            '<div class="sheet-head"><h2>高德地图配置</h2><button class="sheet-close" data-action="close-sheet">✕</button></div>' +
            mapConfigFormHTML() +
          '</div></div>';
        break;
      case 'save-map-config':
        const key = $('#amap-key').value.trim();
        const securityCode = $('#amap-code').value.trim();
        if (!key) { toast('请填写高德 Key', 'warn'); break; }
        db.mapConfig = { key: key, securityCode: securityCode };
        saveDB(); amapPromise = null; closeSheet();
        toast('高德地图配置已保存'); renderApp(true);
        break;
      case 'find-tag':
        const tagItem = getUserItems().find(function (i) { return i.id === el.dataset.id; });
        if (tagItem) {
          $$('.animal-tag').forEach(function (t) { t.classList.remove('selected'); });
          el.classList.add('selected');
          const nameEl = $('#find-name'), subEl = $('#find-sub');
          if (nameEl) nameEl.textContent = tagItem.name;
          if (subEl) subEl.textContent = (tagItem.location || '未填写') + ' · 已选中标签';
          vibrate(10);
        }
        break;
      case 'bind-device': openBind(el.dataset.id); break;
      case 'save-bind':
        const dev = db.devices.find(function (d) { return d.id === el.dataset.id; });
        if (dev) {
          dev.itemId = $('#bind-item').value;
          dev.zone = $('#bind-zone').value.trim() || dev.zone;
          saveDB(); closeSheet(); toast('绑定已保存'); renderApp(true);
        }
        break;
      case 'toggle-away':
        const dv = db.devices.find(function (d) { return d.id === el.dataset.id; });
        if (dv) { dv.awayAlert = !dv.awayAlert; saveDB(); renderApp(); toast(dv.awayAlert ? '离位提醒已开启' : '离位提醒已关闭'); }
        break;
      case 'sample': loadSampleData(); break;
      case 'logout':
        closeOverlay(); closeSheet();
        db.session = null; saveDB();
        state.view = 'home'; state.search = ''; state.filter = 'all';
        state.authTab = 'login'; lastView = null;
        render(); toast('已退出登录'); break;
      default: break;
    }
  }

  /* ---------------- Events ---------------- */

  document.addEventListener('click', function (e) {
    const nav = e.target.closest('[data-nav]');
    if (nav) {
      const key = nav.dataset.nav;
      if (key === 'alerts') state.backTo = 'home';
      if (key === 'guide') state.backTo = 'profile';
      state.view = key;
      state.search = '';
      state.filter = 'all';
      vibrate(10);
      closeOverlay(); closeSheet();
      renderApp(true);
      return;
    }
    const act = e.target.closest('[data-action]');
    if (act) { e.preventDefault(); handleAction(act.dataset.action, act); return; }
    const card = e.target.closest('[data-card]');
    if (card) {
      vibrate(8);
      card.classList.toggle('expanded');
      card.classList.remove('tapped');
      void card.offsetWidth;
      card.classList.add('tapped');
      return;
    }
    if (e.target.dataset && e.target.dataset.mask) { closeSheet(); closeOverlay(); }
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'sp-building' || e.target.id === 'sp-floor') {
      const building = $('#sp-building');
      const floor = $('#sp-floor');
      const room = $('#sp-room');
      if (building && floor && room) {
        const list = roomsForFloor(building.value, floor.value);
        room.innerHTML = list.map(function (r) {
          return '<option value="' + escapeHTML(r) + '">' + escapeHTML(r) + '</option>';
        }).join('');
      }
    }
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'search-input') {
      state.search = e.target.value;
      const area = $('#list-area');
      if (area) area.innerHTML = listHTML();
    }
    if (e.target.id === 'hub-search-input') {
      state.hubSearch = e.target.value;
      const grid = $('.hub-grid');
      if (grid) {
        const q = state.hubSearch.trim().toLowerCase();
        const list = q ? HUB_FEATURES.filter(function (f) {
          return (f.label + f.desc + f.key).toLowerCase().indexOf(q) !== -1;
        }) : HUB_FEATURES;
        grid.innerHTML = list.map(function (f) {
          return '<button class="hub-tile ' + f.color + '" data-action="hub-go" data-nav-target="' + f.nav + '" data-tab="' + (f.tab || '') + '">' +
            '<span class="hub-ico">' + (ICON[f.icon] || ICON.grid) + '</span>' +
            '<b>' + escapeHTML(f.label) + '</b><small>' + escapeHTML(f.desc) + '</small></button>';
        }).join('');
      }
    }
  });

  document.addEventListener('submit', function (e) {
    const form = e.target;

    if (form.id === 'auth-form') {
      e.preventDefault();
      const username = $('#auth-username').value.trim();
      const password = $('#auth-password').value;
      const errorEl = $('#auth-error');
      errorEl.textContent = '';
      if (!username || !password) { errorEl.textContent = '请填写用户名和密码'; return; }
      if (state.authTab === 'register') {
        if (db.users.some(function (u) { return u.username === username; })) { errorEl.textContent = '该用户名已被注册'; return; }
        const nickname = $('#auth-nickname').value.trim() || username;
        const user = { id: uid(), username: username, password: password,
          profile: { name: nickname, contact: '', bio: '' }, createdAt: new Date().toISOString() };
        db.users.push(user); db.session = user.id; saveDB();
        state.view = 'home'; toast('注册成功'); render();
      } else {
        const user = db.users.find(function (u) { return u.username === username && u.password === password; });
        if (!user) { errorEl.textContent = '用户名或密码错误'; return; }
        db.session = user.id; saveDB();
        state.view = 'home'; toast('登录成功'); render();
      }
      return;
    }

    if (form.id === 'item-form') {
      e.preventDefault();
      const itemId = $('#f-name').dataset.itemId || null;
      const item = itemId ? getUserItems().find(function (i) { return i.id === itemId; }) : null;
      const name = $('#f-name').value.trim();
      const storedAt = $('#f-stored').value;
      const expiryDate = $('#f-expiry').value;
      const errorEl = $('#item-error');
      errorEl.textContent = '';
      if (!name) { errorEl.textContent = '请填写物品名称'; return; }
      if (!storedAt) { errorEl.textContent = '请选择收纳日期'; return; }
      if (expiryDate && expiryDate < storedAt) { errorEl.textContent = '保质期不能早于收纳日期'; return; }
      const payload = {
        name: name, category: $('#f-category').value,
        quantity: Math.max(1, parseInt($('#f-quantity').value, 10) || 1),
        location: $('#f-location').value.trim(), storedAt: storedAt,
        expiryDate: expiryDate, notes: $('#f-notes').value.trim(),
        photo: $('#item-photo').value
      };
      if (item) { Object.assign(item, payload); vibrate(15); toast('已保存修改'); }
      else {
        db.items.push(Object.assign({ id: uid(), userId: currentUser().id, createdAt: new Date().toISOString() }, payload));
      }
      saveDB(); closeSheet();
      state.view = 'home'; state.search = ''; state.filter = 'all'; state.itemsOpen = true;
      renderApp(true);
      if (!item) celebrate('已收纳「' + name + '」');
      return;
    }

    if (form.id === 'profile-form') {
      e.preventDefault();
      const user = currentUser();
      user.profile = {
        name: $('#pf-name').value.trim() || user.username,
        contact: $('#pf-contact').value.trim(), bio: $('#pf-bio').value.trim()
      };
      saveDB(); toast('资料已保存'); renderApp(true); return;
    }

    if (form.id === 'chat-form') {
      e.preventDefault();
      const input = $('#chat-text');
      const text = input.value.trim();
      if (!text) return;
      if (!db.messages[state.chatId]) db.messages[state.chatId] = [];
      db.messages[state.chatId].push({ from: 'mine', text: text, time: nowTime() });
      input.value = '';
      saveDB(); renderChatBody(); renderApp(); autoReply(state.chatId);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeOverlay(); closeSheet(); }
  });

  function updateClock() {
    const now = new Date();
    const el = $('#sb-time');
    if (el) el.textContent = now.getHours() + ':' + pad(now.getMinutes());
  }

  function initPullRefresh() {
    const scroller = $('#app-view');
    const screen = $('.device-screen');
    if (!scroller || !screen || !('ontouchstart' in window)) return;

    const indicator = document.createElement('div');
    indicator.className = 'pull-indicator';
    indicator.innerHTML = ICON.refresh + '<span>下拉刷新</span>';
    screen.appendChild(indicator);

    let startY = 0, pulling = false, distance = 0;
    const label = function () { return indicator.querySelector('span'); };

    scroller.addEventListener('touchstart', function (e) {
      if (scroller.scrollTop <= 0 && e.touches.length === 1) {
        startY = e.touches[0].clientY;
        pulling = true;
        distance = 0;
      }
    }, { passive: true });

    scroller.addEventListener('touchmove', function (e) {
      if (!pulling) return;
      distance = e.touches[0].clientY - startY;
      if (distance > 0) {
        indicator.classList.add('show');
        indicator.classList.toggle('ready', distance > 60);
        label().textContent = distance > 60 ? '松开刷新' : '下拉刷新';
      }
    }, { passive: true });

    scroller.addEventListener('touchend', function () {
      if (!pulling) return;
      pulling = false;
      if (distance > 60) {
        vibrate(10);
        label().textContent = '刷新中…';
        setTimeout(function () {
          renderApp(true);
          toast('已刷新，一切都井井有条');
          indicator.classList.remove('show', 'ready');
        }, 420);
      } else {
        indicator.classList.remove('show', 'ready');
      }
      distance = 0;
    }, { passive: true });
  }

  function render() {
    if (currentUser()) renderApp(true);
    else renderAuth();
  }

  updateClock();
  setInterval(updateClock, 30000);
  initPullRefresh();
  render();
})();
