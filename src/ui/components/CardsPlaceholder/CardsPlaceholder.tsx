import { IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { CardsPlaceholderProps } from "./CardsPlaceholder.types";
import "./CardsPlaceholder.scss";

const CardsPlaceholder = ({
  buttonLabel,
  buttonAction,
  testId,
}: CardsPlaceholderProps) => {
  return (
    <div
      className="cards-placeholder-container"
      data-testid={testId}
    >
      <div className="cards-placeholder-cards">
        <span className="back-card" />
        <span className="front-card" />
      </div>
      <IonButton
        shape="round"
        expand="block"
        className="primary-button"
        onClick={buttonAction}
      >
        <IonIcon
          slot="icon-only"
          size="small"
          icon={addOutline}
          color="primary"
        />
        {buttonLabel}
      </IonButton>
    </div>
  );
};

export { CardsPlaceholder };
