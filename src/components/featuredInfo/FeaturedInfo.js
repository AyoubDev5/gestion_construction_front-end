import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">سعر المهمة</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">MAD 2,415</span>
          <span className="featuredMoneyRate"></span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">سعر المواد و راتب الموظفين </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">MAD 4,415</span>
          <span className="featuredMoneyRate"></span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">كلف</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">MAD 2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />{" "}
            <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">
          مقارنة بين سعر المهمة سعر المواد و راتب الموظفين
        </span>
      </div>
    </div>
  );
}
