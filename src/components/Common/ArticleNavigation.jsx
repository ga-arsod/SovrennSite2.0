import { IconButton, Typography } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const ArticleNavigation = () => {
  return (
    <div
      style={{
        position: "fixed",
        right: "10px",
        top: "60%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      {/* Next Article Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <IconButton
          sx={{
            border: "2px solid #008060",
            backgroundColor: "white",
            color: "#008060",
            width: 42,
            height: 42,
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <ArrowForward />
        </IconButton>
        <Typography sx={{ color: "#888", fontSize: 14, marginTop: "5px" }}>
          Next Article
        </Typography>
      </div>

      {/* Previous Article Button (Disabled) */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <IconButton
          disabled
          sx={{
            border: "2px solid #E0E0E0",
            backgroundColor: "#F9F9F9",
            color: "#E0E0E0",
            width: 42,
            height: 42,
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography sx={{ color: "#ccc", fontSize: 14, marginTop: "5px" }}>
          Previous Article
        </Typography>
      </div>
    </div>
  );
};

export default ArticleNavigation;
