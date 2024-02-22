import { Grid, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBoardList = styled.div`
  padding: 0px;
  margin: auto;
  text-align: center;
  width: 80%;
  font-size: 13px;
`;

const FormContainer = styled.div`
  //display: flex;
  //flex-direction: row;
  align-items: center;
  margin: 5% auto;
`;

const Form = styled.form`
  width: 80%;
  margin: auto;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
  }

  textarea {
    /* Set a fixed height for the textarea */
    height: 150px;
    /* You can adjust the height as needed */
  }

  input,
  textarea {
    width: 95%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 25px 10px;
  margin-right: 10px;
  display: inline-block;
  padding: 10px;
  background-color: #42a5f5;
  color: #fff;
  text-decoration: none;

  &:hover {
    background-color: #0d47a1;
  }
`;

const BackButton = styled.p`
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
  display: inline-block;
  padding: 10px 15px;
  background-color: #ccc;
  color: #fff;
  text-decoration: none;
  margin-right: 10px;

  &:hover {
    background-color: #bbb;
  }
`;

// Media query for smaller screens
const media = {
  tablet: `@media(max-width: 768px)`,
};

const ResponsiveForm = styled(Form)`
  ${media.tablet} {
    width: 90%;
  }
`;

const ResponsiveFormGroup = styled(FormGroup)`
  ${media.tablet} {
    margin-bottom: 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BoardCreate = () => {
  const [board, setBoard] = useState({
    admin: "",
    boardTitle: "",
    boardContent: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("subject:", board.boardTitle);
    console.log("content:", board.boardContent);
    try {
      // Assuming you have a valid endpoint for posting data
      const response = await axios.post("/board/BoardCreate", board);
      console.log("성공");
      alert("작성이 완료되었습니다");
      console.log(response.data);
      navigate("/boardList");
    } catch (error) {
      console.log("글작성 실패", error);
    }
  };

  const handleBack = () => {
    navigate("/boardList");
  };

  return (
    <StyledBoardList>
      <FormContainer>
        <h2>글작성</h2>
        <ResponsiveForm onSubmit={handleSubmit}>
          <ResponsiveFormGroup>
            <label htmlFor="boardTitle">제목</label>
            <input
              type="text"
              id="boardTitle"
              value={board.boardTitle}
              onChange={(e) =>
                setBoard({ ...board, boardTitle: e.target.value })
              }
              required
            />
          </ResponsiveFormGroup>
          <ResponsiveFormGroup>
            <label htmlFor="boardContent">내용</label>
            <textarea
              id="boardContent"
              value={board.boardContent}
              onChange={(e) =>
                setBoard({ ...board, boardContent: e.target.value })
              }
              required
            />
          </ResponsiveFormGroup>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
          >
            <Grid item>
              <label htmlFor="boardWriter">작성자 </label>
              <input
                type="text"
                id="boardWriter"
                value={board.boardWriter}
                onChange={(e) =>
                  setBoard({ ...board, boardWriter: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item>
              <label htmlFor="boardPw">비밀번호 </label>
              <input
                type="text"
                id="boardWriter"
                value={board.boardPw}
                onChange={(e) =>
                  setBoard({ ...board, boardPw: e.target.value })
                }
                required
              />
            </Grid>
          </Grid>

          <ButtonContainer>
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              취소
            </Button>
            <Button type="submit">완료</Button>
          </ButtonContainer>
        </ResponsiveForm>
        <BackButton onClick={handleBack}>Back</BackButton>
      </FormContainer>
    </StyledBoardList>
  );
};

export default BoardCreate;
