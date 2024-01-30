import styled from "styled-components";

const CongestionItemBlock = styled.div`
  display: flex;

  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 1rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;
//article 자리에 공항혼잡데이터 끌어오기
const CongestionItem = ({ article }) => {
  //받아올 변수들
  const { title, author, description, url, urlToImage, publishedAt } = article;

  return (
    <CongestionItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a href="url" target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <span>출구명 : {author} </span>
        <span>내국인 : {publishedAt} </span>
        <p>{description}</p>
      </div>
    </CongestionItemBlock>
  );
};
export default CongestionItem;
