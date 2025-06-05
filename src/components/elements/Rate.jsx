export default function Rate({ total, max }) {
   if (total == 0) {
      return <div className="rate rate-isexist">isExist?</div>;
   } else if (total > max * 0.75) {
      return <div className="rate rate-high">High</div>;
   } else if (total < max * 0.25) {
      return <div className="rate rate-low">Low</div>;
   } else {
      return <div className="rate rate-medium">Medium</div>;
   }
}
