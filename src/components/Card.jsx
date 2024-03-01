export const Card = ({ card, licenceName }) => {
  return (
    <>
      <div className="card-container m-5">
        <table className="organizecards">
          <tr>
            <td>
              <div className="nameimageinfo lightning">
                <table className="nameheaders">
                  <tr>
                    <td className="basic" colSpan="3">
                      Fight Card
                    </td>
                  </tr>
                  <tr>
                    <td className="nameofanimal">Nom: {card.name}</td>
                  </tr>
                </table>
                <img
                  className="headshot"
                  src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                  alt="Peronnage"
                />
                <p className="description">{licenceName}</p>
                <div className="infoonly">
                  <table className="stats">
                    <tr>
                      <td className="intelligence">
                        <img
                          src="src/images/Epee.png"
                          width="25"
                          height="25"
                          alt="epee"
                        />
                      </td>
                      <td>
                        <span className="label">Courage: </span>
                      </td>
                      <td className="damage">{card.statCourage}</td>
                    </tr>
                  </table>
                  <hr />
                  <table className="stats">
                    <tr>
                      <td className="courage">
                        <img
                          src="src/images/GantBoxe.png"
                          width="25"
                          height="25"
                          alt="courage"
                        />
                      </td>
                      <td>
                        <span className="label">Force: </span>
                      </td>
                      <td className="damage">{card.statForce}</td>
                    </tr>
                  </table>
                  <hr />
                  <table className="stats">
                    <tr>
                      <td className="Force">
                        <img
                          src="src/images/Cerveau.png"
                          width="25"
                          height="25"
                          alt="Cerveau"
                        />
                      </td>
                      <td>
                        <span className="label">Intelligence: </span>
                      </td>
                      <td className="damage">{card.statIntelligence}</td>
                    </tr>
                  </table>
                  <hr />
                  <p className="italicize">Description: {card.description}</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export const CardComp = () => {
  return (
    <>
      <div className="card-container m-5">
        <div>
          <img src="src/images/lorcana.jpg" alt="dos de carte" />
        </div>
      </div>
    </>
  );
};
