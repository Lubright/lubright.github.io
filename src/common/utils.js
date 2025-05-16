// ------------------------------------
// Date and Time Utilities
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isMyValidDate = (dateString) => {
  const pattern_date = /^\d{4}-\d{2}-\d{2}$/;
  if (pattern_date.test(dateString)) {
    return true;
  }
  return false;
};

export const toMyLocaleDateString = (date) => {
  if (typeof date === "string") {
    date = new Date(date); // 將字串轉換為日期物件
  }

  const month = String(date.getMonth() + 1).padStart(2, "0"); // 確保 2 位數
  const day = String(date.getDate()).padStart(2, "0"); // 確保 2 位數
  return `${date.getFullYear()}-${month}-${day}`;
};

export const getDateDiffString = (date) => {
  if (typeof date === "string") {
    date = new Date(date); // 將字串轉換為日期物件
  }
  const today = new Date(); // 當前日期
  const diffTime = Math.abs(today - date); // 計算時間差 (毫秒)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 計算天數差
  return `${diffDays} days ago`;
};

export const groupReportsByMonth = (reports) => {
  return reports.reduce((acc, report) => {
    const yearMonth = report.date.slice(0, 7); // YYYY-MM
    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(report);
    return acc;
  }, {});
};

export const groupReportsByYear = (data) => {
  return data.reduce((acc, item) => {
    item.date = toMyLocaleDateString(item.date); // 確保日期格式正確
    const year = item.date.slice(0, 4); // YYYY-MM
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});
};

export const groupDateByYear = (dates) => {
  return dates.reduce((acc, date) => {
    const year = date.slice(0, 4); // YYYY-MM
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(date);
    return acc;
  }, []);
};

export const toMyLocaleDateTimeString = (date) => {
  if (typeof date === "string") {
    date = new Date(date); // 將字串轉換為日期物件
  }

  // const month = String(date.getMonth() + 1).padStart(2, "0"); // 確保 2 位數
  // const day = String(date.getDate()).padStart(2, "0"); // 確保 2 位數
  // const hour = String(date.getHours()).padStart(2, "0"); // 確保 2 位數
  // const minute = String(date.getMinutes()).padStart(2, "0"); // 確保 2 位數
  // return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}`;
  return date.toLocaleString(); // 使用當前時區的本地化格式
};

// -----------------------------------------------------

export const createArray = (start, end) => {
  const arr = [];
  if (end < start) {
    return createArray(end, start);
  } else if (end === undefined) {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i++) {
    arr.push(i);
  }

  return arr;
};

export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "expires=" + date.toString();
  }
  // cookie=value; expires=Tue, 19 Jan 2038 03:14:07 GMT
  document.cookie = `${name}=${value || ""}; ${expires}; path=/`;
}

export function getCookie(name) {
  // 'email=abc@abc.com; aaa=bbb'
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
}

export function removeCookie(name) {
  setCookie(name, "", -1); // 設置過期時間為過去的時間
}
