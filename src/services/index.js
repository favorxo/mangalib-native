import { baseUrl } from '../constants/urls';

const getAuthorization = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export const getRecentTop = async () => {
  const res = await fetch(`${baseUrl}/api/titles/daily-top/?count=10`);
  const data = await res.json();
  return data.content;
};

export const getCatalog = async (from, amount) => {
  const res = await fetch(
    `${baseUrl}/api/search/catalog/?ordering=-rating&page=${from}&count=${amount}`
  );
  const data = await res.json();
  return data.content;
};

export const getTitle = async (title) => {
  const res = await fetch(`${baseUrl}/api/titles/${title}/`);
  const data = await res.json();
  return data.content;
};

export const getChapters = async (branchId, page) => {
  const res = await fetch(
    `${baseUrl}/api/titles/chapters/?branch_id=${branchId}&page=${page}&count=60&ordering=-index`
  );
  const data = await res.json();
  return data.content;
};

export const getChapter = async (chapterId) => {
  const res = await fetch(`${baseUrl}/api/titles/chapters/${chapterId}`);
  const data = await res.json();
  return data.content;
};

export const getSearch = async (query, page) => {
  const res = await fetch(
    `${baseUrl}/api/search/?count=10&page=${page}&query=${query}`
  );
  const data = await res.json();
  return data.content;
};

export const getSimilar = async (title) => {
  const res = await fetch(`${baseUrl}/api/titles/${title}/similar`);
  const data = await res.json();
  return data.content;
};
