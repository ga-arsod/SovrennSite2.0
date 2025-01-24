import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SaleBanner() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false); 
  };

  const handleBannerClick = () => {
    router.push("/pricing"); 
  };

  return (
    <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: {
            borderRadius: 10,
            overflow: "hidden",
          },
        }}
        BackdropProps={{
            style: {
              backgroundColor: "#1C1C1C80", 
             
            },
          }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box position="relative">
           
            <Box
              sx={{ position: "relative", width: "100%", height: "auto", cursor: "pointer" }}
              onClick={handleBannerClick} 
            >
              <Image
                src={"https://dwht5p5xdhql3.cloudfront.net/BANNERS/RepublicDaySaleBanner.png"} 
                alt="Sovrenn Financial Freedom Sale"
                width={500} 
                height={300}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>

           
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                width: "5%", 
                maxWidth: "40px",
                height: "auto",
                cursor: "pointer",
              }}
              onClick={handleClose} 
            >
              <Image
                src="/sovrenn-sale-banner-icon.png"
                alt="Close Button"
                layout="responsive" 
                width={40} 
                height={40}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
