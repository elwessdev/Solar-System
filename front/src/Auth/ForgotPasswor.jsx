import React, { useState } from "react";
import "./ForgotPasswor.scss";
import "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setMessage("Veuillez entrer une adresse email.");
    } else if (!emailPattern.test(email)) {
      setMessage("Veuillez entrer une adresse email valide.");
    } else {
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // Générer un code à 6 chiffres
      setVerificationCode(code);

      // Envoyer le code via EmailJS
      emailjs
        .send(
          "service_tl46kjj", // Remplacez par votre Service ID
          "template_zu0s6uj", // Remplacez par votre Template ID
          {
            user_email: email,
            verification_code: code,
          },
          "720x8AKWTjrpwGxuS" // Remplacez par votre Public Key
        )
        .then(
          () => {
            setMessage("Un code de vérification a été envoyé à votre adresse email.");
            setIsEmailVerified(true);
          },
          (error) => {
            console.error("Erreur lors de l'envoi de l'email :", error.text);
            setMessage("Une erreur s'est produite lors de l'envoi de l'email.");
          }
        );
    }
  };

  const handleVerifyCode = () => {
    if (inputCode === verificationCode) {
      setMessage("Code vérifié avec succès. Vous pouvez réinitialiser votre mot de passe.");
    } else {
      setMessage("Le code de vérification est incorrect.");
    }
  };

  return (
    <div>
      <div className="form-gap"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3>
                    <i className="fa fa-lock fa-4x"></i>
                  </h3>
                  <h2 className="text-center">Mot de passe oublié ?</h2>
                  <p>Vous pouvez réinitialiser votre mot de passe ici.</p>
                  <div className="panel-body">
                    <form id="register-form" onSubmit={handleEmailSubmit}>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="glyphicon glyphicon-envelope color-blue"></i>
                          </span>
                          <input
                            id="email"
                            name="email"
                            placeholder="Adresse email"
                            className="form-control"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isEmailVerified}
                          />
                        </div>
                      </div>
                      {!isEmailVerified && (
                        <div className="form-group">
                          <button className="btn btn-lg btn-primary btn-block" type="submit">
                            Envoyer le code de vérification
                          </button>
                        </div>
                      )}
                    </form>

                    {isEmailVerified && (
                      <div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Entrez le code de vérification"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <Link to="/PasswordForm"><button className="btn btn-lg btn-success btn-block" onClick={handleVerifyCode}>
                            Vérifier le code
                          </button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {message && <div className="alert alert-info mt-3">{message}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
