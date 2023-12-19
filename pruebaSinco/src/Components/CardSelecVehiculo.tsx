import {
  Card,
  Button,
  CardMedia,
  CardHeader,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

interface props {
  image: string;
  router: string;
  title: string;
  textButton: string;
  icon: any;
}
export const CardSelecVehiculo = ({
  image,
  router,
  title,
  textButton,
  icon,
}: props) => {
  return (
    <Card sx={{ margin: 2, width: 250,padding:2 }}>
      <CardHeader title={title} titleTypographyProps="text.primary" />
      <CardMedia component="img" alt="Concesionario Image" image={image} />
      <CardActions sx={{ justifyContent: "end" }}>
        <Button
          size="small"
          variant="contained"
          component={Link}
          to={router}
          startIcon={icon}
        >
          {textButton}
        </Button>
      </CardActions>
    </Card>
  );
};
