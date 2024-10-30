"use client";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  Paper,
  ListItem,
  Divider,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  commentLikeApi,
  commentunLikeApi,
  commentDeleteApi,
  postCommentApi,
} from "@/app/Redux/Slices/commentsSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { colors } from "../Constants/colors";
import Snackbar from "../../components/Snackbar/SnackBar";

const StyledTypography1 = styled(Typography)`
  font-size: 23px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.02em;
`;

const StyledTypography2 = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  color: black;
  white-space: nowrap;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.navyBlue500};
  padding: 8px 16px;
  text-transform: none;
  border-color: transparent;
  &:hover {
    background-color: transparent;
    border-color: transparent;
  }
`;

const StyledButton1 = styled(Button)`
  color: white;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${colors.themeGreen};
  text-transform: none;
  &:hover {
    background-color: ${colors.themeButtonHover};
  }
`;

const CustomDivider = styled(Divider)`
  background-color: ${colors.neutral500};
  border-color: none;
  border-bottom-width: 0px;
  height: 2px;
`;

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: ${colors.black};
    text-align: justify;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
  padding: 2px 4px;
 
`;

const CommentDrawer = ({
  isCommentsModalOpen,
  setIsCommentsModalOpen,
  comments,
  company_id,
  component
}) => {
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [avatarColors, setAvatarColors] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((store) => store.auth);

  useEffect(() => {
    const sortedComments = [...(comments?.comments || [])].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    setCommentList(sortedComments);

    if (avatarColors.length === 0) {
      const colors = sortedComments.map(() => getRandomColor());
      setAvatarColors(colors);
    }
  }, [comments]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      return;
    }

    dispatch(
      postCommentApi({
        comment: newComment,
        company_id:company_id,
        user_id: userDetails._id,
        component:component
      })
    );

    setNewComment("");
  };

  const handleMenuClick = (event, commentId) => {
   
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = () => {
    dispatch(
      commentDeleteApi({
        company_id: company_id,
        comment_id: selectedCommentId,
        component:component
      })
    );

    setCommentList((prevList) =>
      prevList.filter((c) => c._id !== selectedCommentId)
    );

    handleMenuClose();
  };

  const onClose = () => {
    setIsCommentsModalOpen(false);
  };

  const handleLikeToggle = (commentId) => {
    const comment = commentList.find((c) => c._id === commentId);
    if (comment.has_liked) {
      dispatch(commentunLikeApi({ company_id:company_id, comment_id: commentId,component:component }));
    } else {
      dispatch(commentLikeApi({ company_id:company_id, comment_id: commentId,component:component }));
    }

    setCommentList((prevList) =>
      prevList.map((c) =>
        c._id === commentId
          ? {
              ...c,
              has_liked: !c.has_liked,
              total_likes: c.has_liked ? c.total_likes - 1 : c.total_likes + 1,
            }
          : c
      )
    );
  };

  return (
    <>
      <Snackbar isCommentsModalOpen={isCommentsModalOpen} />
      <Drawer
        anchor="right"
        open={isCommentsModalOpen}
        onClose={onClose}
        sx={{ zIndex: 1400 }}
        PaperProps={{
          sx: {
            width: {
              xs: '100%', 
              sm: '425px', 
            },
          },
        }}
      >
        <Box
          sx={{
           
            padding: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StyledTypography1 variant="h1" color={colors.navyBlue500}>
              Comments
            </StyledTypography1>
            <IconButton onClick={onClose} sx={{ color: "black" }}>
              <Close />
            </IconButton>
          </Box>
          <CustomDivider sx={{ marginBottom: 3 }} />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Write what you think..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            rows={5}
            InputProps={{
              sx: {
                "& .MuiInputBase-input": {
                  color: colors.navyBlue500, 
                },
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "19px",
                padding: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.navyBlue200,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.navyBlue200,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.navyBlue200,
                },
              },
            }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}
          >
            <StyledButton
              variant="outlined"
              onClick={() => {
                setNewComment("");
                onClose();
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton1
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginLeft: 1 }}
            >
              Comment
            </StyledButton1>
          </Box>
          {
            commentList?.length==0 ? <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',flexGrow:1}}>
            <Typography sx={{fontWeight:'600',fontSize:'14px',lineHeight:'17px'}} color={colors.neutral700}>There are no comments yet, be the first one to comment</Typography>
          </Box> :
           <List
           sx={{
             flexGrow: 1,
             overflow: "auto",
             "&::-webkit-scrollbar": { display: "none" },
           }}
         >
           {commentList?.map((element, index) => (
             <React.Fragment key={element._id}>
               <ListItem
                 alignItems="flex-start"
                 sx={{
                   display: "flex",
                   justifyContent: "space-between",
                   paddingX: 0,
                   gap: 2,
                 }}
               >
                 <Box sx={{ display: "flex" }}>
                   <Avatar sx={{ backgroundColor: avatarColors[index] }}>
                     {element.commenter
                       .split(" ")
                       .map((word, index) =>
                         index === 0 || index === 1 ? word[0] : null
                       )
                       .join("")
                       .toUpperCase()}
                   </Avatar>
                   <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                     <Box
                       sx={{ display: "flex", alignItems: "center", gap: 1 }}
                     >
                       <StyledTypography2>
                         {element.commenter}
                       </StyledTypography2>
                       <Typography
                         variant="caption"
                         color="#8EA7BB"
                       ></Typography>
                       <IconButton
                         size="small"
                         onClick={(event) =>
                           handleMenuClick(event, element._id)
                         }
                       >
                         <MoreHorizOutlinedIcon
                           fontSize="small"
                           sx={{ color: "black" }}
                         />
                       </IconButton>
                     </Box>
                     <StyledListItemText primary={element.comment} />
                   </Box>
                 </Box>
                 <Box sx={{ display: "flex", flexDirection: "column" }}>
                   <IconButton
                     onClick={() => handleLikeToggle(element._id)}
                     size="small"
                     sx={{ padding: 0, color: colors.navyBlue500 }}
                   >
                     {element.has_liked ? (
                       <ThumbUpIcon fontSize="small" />
                     ) : (
                       <ThumbUpOutlinedIcon fontSize="small" />
                     )}
                   </IconButton>
                   <Typography
                     sx={{
                       fontSize: "12px",
                       fontWeight: "400",
                       lineHeight: "15px",
                       marginTop: 1,
                     }}
                     color={colors.navyBlue500}
                   >
                     {element.total_likes}
                   </Typography>
                 </Box>
               </ListItem>
               <CustomDivider />
             </React.Fragment>
           ))}
         </List>
          }
         
         
        </Box>
        {/* Delete Comment Menu */}
        <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  PaperProps={{
    elevation: 2,
    sx: {
      width: 132,
      padding: {
        xs: '4px -4px',
        sm: '8px -4px', 
      },
      maxHeight: {
        xs: '45px', 
        overflow:'hidden',
      },
    },
  }}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  transformOrigin={{ vertical: "top", horizontal: "center" }}
  sx={{ zIndex: 1500 }}
>
  <CustomMenuItem
    onClick={handleDeleteComment}
    style={{ color: colors.red500, margin: 0 }}
  >
    <Delete fontSize="small" sx={{ marginRight: 1 }} />
    Delete Comment
  </CustomMenuItem>
</Menu>
      </Drawer>
    </>
  );
};

export default CommentDrawer;
