import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ ResName, ResCatagory, ResDetail }) {
  const nevigate = useNavigate();
  return (
    <Card className="max-w-[230px] w-full flex flex-col justify-center shadow-md rounded-xl">
      <CardMedia
        sx={{ height: 140 }}
        image="https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C3DHBBUVKB4AVN/hero/3d9c7600530749b6a571987753ac4570_1646719404689331817.webp"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {ResName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ResCatagory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ResDetail}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-center">
        <Button
          className=" bg-[#009C49] text-[white] border-[1px] border-solid border-gray-400 shadow-md"
          size="small"
          onClick={() => {
            nevigate("/ownerstore-detail");
          }}
        >
          ดูข้อมูล
        </Button>
        <Button
          className=" bg-[#c63333] text-[white] border-[1px] border-solid border-gray-400 shadow-md"
          size="small"
        >
          ลบ
        </Button>
      </CardActions>
    </Card>
  );
}
