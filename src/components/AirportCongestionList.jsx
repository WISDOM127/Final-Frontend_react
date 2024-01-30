import { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./AirportCongestionItem";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const AirportCongestionList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //컴포넌트가 렌더링 될 때마다 API 요청
    //async 를 처리하는 함수
    const fetchData = async () => {
      setLoading(true); //로딩 상태 활성화
      try {
        const select = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(`https://`);
        setArticles(response.data.articles); //가져온 데이터 articles에 저장
      } catch (err) {
        console.log("error");
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  //대기중일때
  if (loading) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }

  //아직 article 값이 설정되지 않았을 때
  if (!articles) {
    return null;
  }

  //article 값이 있을 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default AirportCongestionList;
