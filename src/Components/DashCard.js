import { Button, Card } from "react-bootstrap";
import Colors from "../Constants/colors";

export default function DashCard({ header, number}) {
  return (
    <div style={{margin:"10px"}}>
      <Card className="text-center" style={{borderWidth:1, borderColor:Colors.primary}}>
        <Card.Header  style={{fontSize:30, }}>{header}</Card.Header>
        <Card.Body>
          <Card.Title style={{fontSize:70}}>{number}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
