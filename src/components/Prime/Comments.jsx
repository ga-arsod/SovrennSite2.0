"use client";
import React, { useState } from "react";
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
import { Close, Edit, Delete, ThumbUp } from "@mui/icons-material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { colors } from "../Constants/colors";
import styled from "@emotion/styled";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const comments = [
  {
    id: 1,
    name: "Ritik Sahu",
    text: "Run into a roadblock... Can someone please help me out?",
    time: "12h",
  },
  {
    id: 2,
    name: "Ronald Richards",
    text: "Just wanted to give a shoutout to [team member] for their hard work on this task, it's really paying off!",
    time: "12h",
  },
  {
    id: 3,
    name: "Floyd Miles",
    text: "Can someone please provide me with more information about the target audience for this task? I want",
    time: "12h",
  },
];

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
  background-color: ${colors.neutral500}; /* Adjust the color as needed */
  border-color: none;
  border-bottom-width: 0px;
  height: 2px; /* Adjust the thickness as needed */
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
  padding: 4px 8px;
`;

const CommentDrawer = () => {
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddComment = () => {
    setNewComment("");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{ zIndex: 1400 }}
    >
      <Box
        sx={{
          width: 425,
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
              color: colors.greyBlue200,
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "19px",
              padding: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.navyBlue200200,
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}>
          <StyledButton variant="outlined" onClick={() => setNewComment("")}>
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
        <List
          sx={{
            flexGrow: 1,
            overflow: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem
                alignItems="flex-start"
                sx={{ display: "flex", gap: 5, paddingX: 0 }}
              >
                <Box sx={{ display: "flex" }}>
                  <Avatar>{comment.name[0]}</Avatar>
                  <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <StyledTypography2>{comment.name}</StyledTypography2>
                      <Typography variant="caption" color="#8EA7BB">
                        {comment.time}
                      </Typography>
                      <IconButton size="small" onClick={handleMenuClick}>
                        <MoreHorizOutlinedIcon
                          fontSize="small"
                          sx={{ color: "black" }}
                        />
                      </IconButton>
                    </Box>
                    <StyledListItemText primary={comment.text} />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton size="small">
                    <ThumbUpOutlinedIcon
                      fontSize="medium"
                      sx={{ color: "black" }}
                    />
                  </IconButton>
                  <Typography
                    variant="caption"
                    textAlign="center"
                    color="#8EA7BB"
                  >
                    144
                  </Typography>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ zIndex: 1600 }}
          PaperProps={{
            sx: {
              padding: 0,
            },
            component: Paper,
          }}
          MenuListProps={{
            sx: {
              padding: "4px",
            },
          }}
        >
          <CustomMenuItem
            onClick={handleMenuClose}
            style={{ color: colors.red500, margin: 0 }}
          >
            <Edit fontSize="small" /> Edit Comment
          </CustomMenuItem>
          <CustomMenuItem
            onClick={handleMenuClose}
            style={{ color: colors.navyBlue500, margin: 0 }}
          >
            <Delete fontSize="small" /> Delete Comment
          </CustomMenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
};

export default CommentDrawer;
