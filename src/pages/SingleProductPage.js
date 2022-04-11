import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import { useProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading,
    single_product_error,
    single_product,
    fetchSingleProduct,
  } = useProductsContext();
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = single_product;

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (single_product_error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    //eslint-disable-next-line
  }, [single_product_error]);

  if (single_product_loading) {
    return <Loading />;
  }

  if (single_product_error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <PageHero title={name} single_product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">
              {formatPrice(price)}
            </h5>
            <p className="desc">
              {description}
            </p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? 'In stock' : 'Out of stock'}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />

            {stock > 0 && <AddToCart single_product={single_product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
