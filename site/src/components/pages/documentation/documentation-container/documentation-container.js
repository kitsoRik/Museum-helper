import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './DocumentationContainer.scss';

const DocumentationContainer = (props) => {
    return ( 
        <div className="documentation-container">
            <div>
                <span className="documentation-subtitle">Що це за сервіс?</span>
                <p className="documentation-text">
                    Це сервіс який дозволяє простим користувачам зберігати дані про картини в музеях в своєму смартфоні. 
                </p>
            </div>
            <div>
                <span className="documentation-subtitle">Як почати користуватися</span>
                <p className="documentation-text">
                    Для початку потрібно зареєструватися в сервісі, так ознайомитися з можливостями:

                    <ul>
                        <li>1. Створити музей</li>  
                        <li>2. Добавити картину</li>  
                        <li>3. Розповсюдити в додатку</li>
                    </ul> 
                </p>
            </div>
            <div>
                <span className="documentation-subtitle">Створення музею</span>
                <p className="documentation-text">
                    Для того щоб створити музей, потрібно на вкладці <Link to="/museums">Музеї</Link> клікнути
                    на кнопку позначену плюсом (+), після чого вказати назву музею за яким він буде
                    видаватися в пошуку та місце знаходження. 
                </p>
            </div>
            <div>
                <span className="documentation-subtitle">Добавлення картини</span>
                <p className="documentation-text">
                    Для того щоб добавити картину потрібно зайти на сторінку <Link to="/pictures">Картини</Link> (повинен бути створений принаймі один музей),
                    нажати кнопку позначену плюсом (+) та вказати основні дані (тільки для розробника) картини (Ім'я, опис та QR код за який буде видаватися картина),
                    далі можна приступити до додавання зображень картини та опису картини на різних мовах.
                </p>
            </div>
            <div>
                <span className="documentation-subtitle">Розповсюдження</span>
                <p className="documentation-text">
                    При створення та редагуванні картин їх не можливо знайти до поки не буде добавлено новий випуск, 
                    який тільки останні картини виставить у пошук (картини які позначено не входити в випуск - не ввійдуть).
                    Після випуску можна приступати до редагування картин, ці зміни не будуть показуватися до нового випуску.
                </p>
            </div>
        </div>
     );
}

export default DocumentationContainer;