import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .certs-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* match Projects */
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const StyledCert = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .cert-inner {
        transform: translateY(-7px); /* match Projects */
      }
    }
  }

  .cert-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem; /* match Projects padding */
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .cert-top {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-bottom: 24px;

    .left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0; /* allow text ellipsis */
    }
  }

  .titles {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .cert-title {
    margin: 0 0 6px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl); /* match Projects title scale */
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cert-meta {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;

    .issuer {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }

  .cert-description {
    color: var(--light-slate);
    font-size: 17px; /* match Projects description */
    margin-bottom: 16px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .cert-actions {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-size: var(--fz-sm);
      white-space: nowrap;
    }

    .dot {
      color: var(--light-slate);
    }
  }
`;

const Certifications = () => {
  const data = useStaticQuery(graphql`
    query CertificationsQuery {
      certs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/certifications/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              issuer
              date
              url
              pdf {
                publicURL
              }
            }
            html
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);
  const revealList = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
    revealList.current.forEach((ref, i) => ref && sr.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  const certs = data.certs?.edges || [];

  const getUrl = v => {
    // supports string or File publicURL
    if (!v) {
      return null;
    }
    if (typeof v === 'string') {
      return v;
    }
    if (typeof v === 'object' && v.publicURL) {
      return v.publicURL;
    }
    return null;
  };

  return (
    <StyledCertsSection id="certifications" ref={revealContainer}>
      <h2 className="numbered-heading">Certifications</h2>

      {certs.length === 0 ? (
        <p style={{ color: 'var(--light-slate)', marginTop: '20px' }}>Coming soon.</p>
      ) : (
        <ul className="certs-grid">
          {certs.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, issuer, url, pdf } = frontmatter;

            const pdfUrl = getUrl(pdf);

            return (
              <StyledCert key={i} ref={el => (revealList.current[i] = el)}>
                <div className="cert-inner">
                  <div className="cert-top">
                    <div className="left">
                      {/* You can add issuer logo or icon here if needed */}
                    </div>
                    <div className="titles">
                      <h3 className="cert-title" title={title}>
                        {title}
                      </h3>
                      <div className="cert-meta">
                        {issuer && (
                          <span className="issuer" title={issuer}>
                            {issuer}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {html && (
                    <div className="cert-description" dangerouslySetInnerHTML={{ __html: html }} />
                  )}

                  {(url || pdfUrl) && (
                    <div className="cert-actions">
                      {url && (
                        <a href={url} target="_blank" rel="noreferrer">
                          Verify
                        </a>
                      )}
                      {url && pdfUrl && <span className="dot">•</span>}
                      {pdfUrl && (
                        <a href={pdfUrl} target="_blank" rel="noreferrer">
                          PDF
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </StyledCert>
            );
          })}
        </ul>
      )}
    </StyledCertsSection>
  );
};

export default Certifications;
