import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../../util/constants/constant";

export default function RestaurantCard({
  ResName,
  ResCatagory,
  ResDetail,
  ResImage,
  ResOwner_id,
}: any) {
  const nevigate = useNavigate();
  const PreviewImage = ({ data }: any) => (
    <CardMedia
      className="bg-contain"
      sx={{ height: 140 }}
      image={`data:image/png;base64,${data}`}
      title="green iguana"
    />
  );
  //GET STORE
  //API DELETE STORE
  const deleteStore = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/deletestore`, data);

    if (response.data.success) {
      console.log("Delete Successfull");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <Card className="max-w-[230px] w-full flex flex-col justify-center shadow-md rounded-xl border-2">
      <PreviewImage data={ResImage} />
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
          onClick={() => {
            deleteStore(ResOwner_id);
          }}
        >
          ลบ
        </Button>
      </CardActions>
    </Card>
  );
}
