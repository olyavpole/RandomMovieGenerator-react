import { Link } from 'react-router-dom';

import './logo.scss';

const Logo = () => {
    return (
        <div className="logo__wrapper">
            <Link className="logo__link" to="/">
                <svg className="logo__img" width="200" height="183" viewBox="0 0 200 183" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="183" fill="url(#paint0_linear_1_5)"/>

                    <path d="M24.8555 50.8125H41.168C44.4258 50.8125 47.3203 51.3867 49.8516 52.5352C52.3828 53.6602 54.3633 55.3242 55.793 57.5273C57.2461 59.707 57.9727 62.3906 57.9727 65.5781C57.9727 68.0625 57.4336 70.3125 56.3555 72.3281C55.2773 74.3203 53.8359 75.9609 52.0312 77.25C50.2266 78.5391 48.2109 79.3477 45.9844 79.6758L44.8945 80.0977H25.3125L25.2422 78.1992H42.8906C45.8203 78.1992 48.2578 77.5898 50.2031 76.3711C52.1484 75.1523 53.6133 73.582 54.5977 71.6602C55.582 69.7148 56.0742 67.6875 56.0742 65.5781C56.0742 62.8828 55.4648 60.5859 54.2461 58.6875C53.0273 56.7656 51.293 55.2891 49.043 54.2578C46.8164 53.2266 44.1914 52.7109 41.168 52.7109H26.7539V102H24.8555V50.8125ZM58.1133 102L44.0859 79.4297L46.3008 79.3594L60.1172 101.508V102H58.1133ZM72.7031 50.8125H74.8477L95.9062 99.2227L117.035 50.8125H119.145L96.6797 102H95.168L72.7031 50.8125ZM72.1406 50.8125H74.0391V77.2852V102H72.1406V50.8125ZM117.914 50.8125H119.812V102H117.914V77.2852V50.8125ZM169.945 78.7969V96.5156C169.406 97.2891 168.387 98.1562 166.887 99.1172C165.41 100.078 163.465 100.922 161.051 101.648C158.66 102.352 155.801 102.703 152.473 102.703C149.566 102.703 146.906 102.164 144.492 101.086C142.078 100.008 139.992 98.4727 138.234 96.4805C136.477 94.4648 135.117 92.0859 134.156 89.3438C133.219 86.5781 132.75 83.5312 132.75 80.2031V71.8359C132.75 68.6016 133.207 65.6602 134.121 63.0117C135.059 60.3633 136.371 58.0781 138.059 56.1562C139.77 54.2109 141.797 52.7227 144.141 51.6914C146.484 50.6367 149.062 50.1094 151.875 50.1094C155.578 50.1094 158.707 50.7539 161.262 52.043C163.816 53.332 165.809 55.0781 167.238 57.2812C168.691 59.4609 169.57 61.9219 169.875 64.6641H167.977C167.625 62.4375 166.863 60.3633 165.691 58.4414C164.52 56.5195 162.809 54.9727 160.559 53.8008C158.332 52.6055 155.438 52.0078 151.875 52.0078C149.273 52.0078 146.906 52.5 144.773 53.4844C142.664 54.4453 140.848 55.8047 139.324 57.5625C137.824 59.3203 136.664 61.4062 135.844 63.8203C135.047 66.2344 134.648 68.8828 134.648 71.7656V80.2031C134.648 83.2266 135.059 85.9922 135.879 88.5C136.723 91.0078 137.93 93.1875 139.5 95.0391C141.07 96.8672 142.945 98.2852 145.125 99.293C147.328 100.301 149.777 100.805 152.473 100.805C155.262 100.805 157.723 100.523 159.855 99.9609C162.012 99.375 163.781 98.6836 165.164 97.8867C166.57 97.0664 167.531 96.3164 168.047 95.6367V80.7305H152.402V78.7969H169.945Z" fill="black"/>

                    <path d="M28.2928 124.939V141.54H27.2186V120.407H28.2928V124.939ZM28.1561 129.157L27.5897 128.044C27.7199 127.002 27.9999 126.006 28.4295 125.056C28.8723 124.092 29.4452 123.233 30.1483 122.478C30.8644 121.722 31.6913 121.124 32.6288 120.681C33.5793 120.238 34.6275 120.017 35.7733 120.017C36.841 120.017 37.7915 120.16 38.6249 120.446C39.4712 120.72 40.1808 121.156 40.7538 121.755C41.3397 122.341 41.7824 123.109 42.0819 124.06C42.3944 125.01 42.5506 126.15 42.5506 127.478V141.54H41.4959V127.478C41.4959 125.785 41.2486 124.476 40.7538 123.552C40.259 122.627 39.5754 121.983 38.703 121.618C37.8306 121.241 36.8345 121.052 35.7147 121.052C34.3866 121.052 33.2538 121.351 32.3163 121.95C31.3788 122.536 30.6105 123.272 30.0116 124.157C29.4126 125.043 28.9634 125.941 28.6639 126.853C28.3644 127.764 28.1952 128.532 28.1561 129.157ZM42.5506 127.478L41.828 126.833C41.9582 125.935 42.2446 125.082 42.6874 124.275C43.1431 123.454 43.729 122.725 44.4452 122.087C45.1613 121.449 45.9946 120.948 46.9452 120.583C47.9087 120.206 48.9634 120.017 50.1092 120.017C51.1769 120.017 52.1275 120.166 52.9608 120.466C53.8071 120.752 54.5168 121.215 55.0897 121.853C55.6756 122.478 56.1183 123.285 56.4178 124.275C56.7303 125.264 56.8866 126.462 56.8866 127.868V141.54H55.8319V127.868C55.8319 126.071 55.5845 124.678 55.0897 123.689C54.5949 122.699 53.9113 122.009 53.0389 121.618C52.1665 121.228 51.1704 121.039 50.0506 121.052C48.8006 121.065 47.7134 121.299 46.7889 121.755C45.8775 122.198 45.1157 122.758 44.5038 123.435C43.8918 124.112 43.423 124.815 43.0975 125.544C42.785 126.26 42.6027 126.905 42.5506 127.478ZM66.6913 131.384V130.564C66.6913 129.014 66.9126 127.595 67.3553 126.306C67.8111 125.017 68.4426 123.903 69.2499 122.966C70.0702 122.028 71.0467 121.306 72.1795 120.798C73.3124 120.277 74.5624 120.017 75.9295 120.017C77.3098 120.017 78.5663 120.277 79.6991 120.798C80.8319 121.306 81.8084 122.028 82.6288 122.966C83.4491 123.903 84.0806 125.017 84.5233 126.306C84.966 127.595 85.1874 129.014 85.1874 130.564V131.384C85.1874 132.933 84.966 134.353 84.5233 135.642C84.0806 136.931 83.4491 138.044 82.6288 138.982C81.8215 139.919 80.8514 140.648 79.7186 141.169C78.5858 141.677 77.3358 141.931 75.9686 141.931C74.5884 141.931 73.3319 141.677 72.1991 141.169C71.0663 140.648 70.0897 139.919 69.2694 138.982C68.4491 138.044 67.8111 136.931 67.3553 135.642C66.9126 134.353 66.6913 132.933 66.6913 131.384ZM67.7459 130.564V131.384C67.7459 132.647 67.9282 133.851 68.2928 134.997C68.6704 136.13 69.2108 137.139 69.9139 138.025C70.617 138.91 71.4764 139.607 72.492 140.114C73.5077 140.622 74.6665 140.876 75.9686 140.876C77.2577 140.876 78.4035 140.622 79.4061 140.114C80.4217 139.607 81.2811 138.91 81.9842 138.025C82.6874 137.139 83.2212 136.13 83.5858 134.997C83.9504 133.851 84.1327 132.647 84.1327 131.384V130.564C84.1327 129.327 83.9504 128.142 83.5858 127.009C83.2212 125.876 82.6808 124.867 81.9647 123.982C81.2616 123.083 80.4022 122.374 79.3866 121.853C78.3709 121.332 77.2186 121.071 75.9295 121.071C74.6405 121.071 73.4881 121.332 72.4725 121.853C71.4699 122.374 70.6105 123.083 69.8944 123.982C69.1913 124.867 68.6574 125.876 68.2928 127.009C67.9282 128.142 67.7459 129.327 67.7459 130.564ZM101.047 140.29L108.82 120.407H109.953L101.73 141.54H100.734L101.047 140.29ZM93.6249 120.407L101.398 140.31L101.711 141.54H100.695L92.492 120.407H93.6249ZM120.422 120.407V141.54H119.367V120.407H120.422ZM118.82 113.806C118.82 113.506 118.924 113.252 119.133 113.044C119.341 112.823 119.595 112.712 119.894 112.712C120.194 112.712 120.448 112.823 120.656 113.044C120.877 113.252 120.988 113.506 120.988 113.806C120.988 114.105 120.877 114.359 120.656 114.568C120.448 114.776 120.194 114.88 119.894 114.88C119.595 114.88 119.341 114.776 119.133 114.568C118.924 114.359 118.82 114.105 118.82 113.806ZM139.953 141.931C138.664 141.931 137.459 141.677 136.34 141.169C135.22 140.648 134.237 139.919 133.39 138.982C132.544 138.044 131.88 136.937 131.398 135.661C130.93 134.372 130.695 132.959 130.695 131.423V130.564C130.695 129.014 130.923 127.601 131.379 126.325C131.848 125.036 132.486 123.923 133.293 122.985C134.113 122.035 135.057 121.306 136.125 120.798C137.193 120.277 138.338 120.017 139.562 120.017C140.734 120.017 141.808 120.238 142.785 120.681C143.762 121.11 144.608 121.722 145.324 122.517C146.053 123.311 146.613 124.262 147.004 125.368C147.394 126.475 147.59 127.699 147.59 129.04V130.271H131.379V129.216H146.535V128.962C146.535 127.543 146.249 126.241 145.676 125.056C145.103 123.858 144.295 122.894 143.254 122.165C142.212 121.436 140.982 121.071 139.562 121.071C138.39 121.071 137.323 121.319 136.359 121.814C135.409 122.308 134.588 122.992 133.898 123.864C133.208 124.724 132.674 125.726 132.297 126.872C131.932 128.018 131.75 129.249 131.75 130.564V131.423C131.75 132.738 131.958 133.969 132.375 135.114C132.792 136.26 133.371 137.269 134.113 138.142C134.855 139.001 135.721 139.678 136.711 140.173C137.713 140.655 138.794 140.896 139.953 140.896C141.164 140.896 142.29 140.694 143.332 140.29C144.387 139.887 145.35 139.118 146.223 137.985L146.965 138.513C146.496 139.177 145.93 139.769 145.265 140.29C144.614 140.798 143.846 141.202 142.961 141.501C142.088 141.788 141.086 141.931 139.953 141.931ZM170.539 136.364C170.539 135.726 170.363 135.082 170.012 134.431C169.66 133.767 169.022 133.148 168.098 132.575C167.173 132.002 165.838 131.527 164.094 131.15C162.909 130.889 161.867 130.603 160.969 130.29C160.083 129.978 159.341 129.607 158.742 129.177C158.143 128.734 157.694 128.2 157.394 127.575C157.095 126.95 156.945 126.208 156.945 125.349C156.945 124.607 157.101 123.916 157.414 123.278C157.739 122.627 158.208 122.061 158.82 121.579C159.432 121.084 160.174 120.7 161.047 120.427C161.919 120.153 162.909 120.017 164.015 120.017C165.591 120.017 166.939 120.271 168.058 120.778C169.191 121.286 170.057 121.996 170.656 122.907C171.268 123.806 171.574 124.854 171.574 126.052H170.5C170.5 125.179 170.246 124.366 169.738 123.61C169.243 122.855 168.514 122.243 167.551 121.775C166.587 121.306 165.409 121.071 164.015 121.071C162.596 121.071 161.444 121.286 160.558 121.716C159.673 122.146 159.022 122.686 158.605 123.337C158.202 123.988 158 124.646 158 125.31C158 125.857 158.078 126.364 158.234 126.833C158.39 127.289 158.69 127.719 159.133 128.122C159.588 128.513 160.239 128.884 161.086 129.235C161.932 129.587 163.039 129.919 164.406 130.232C166.086 130.609 167.453 131.065 168.508 131.599C169.562 132.133 170.337 132.79 170.832 133.571C171.34 134.34 171.594 135.277 171.594 136.384C171.594 137.204 171.418 137.953 171.066 138.63C170.728 139.307 170.233 139.893 169.582 140.388C168.944 140.883 168.163 141.267 167.238 141.54C166.327 141.801 165.305 141.931 164.172 141.931C162.466 141.931 161.021 141.67 159.836 141.15C158.664 140.616 157.772 139.913 157.16 139.04C156.561 138.155 156.262 137.198 156.262 136.169H157.316C157.407 137.38 157.805 138.331 158.508 139.021C159.224 139.698 160.09 140.179 161.105 140.466C162.134 140.739 163.156 140.876 164.172 140.876C165.565 140.876 166.73 140.655 167.668 140.212C168.618 139.769 169.334 139.203 169.816 138.513C170.298 137.81 170.539 137.094 170.539 136.364Z" fill="black"/>

                    <defs>
                        <linearGradient id="paint0_linear_1_5" x1="100" y1="0" x2="100" y2="183" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#EFF317"/>
                        <stop offset="1" stopColor="#C4C4C4" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>
            </Link>
        </div>
    )
}

export default Logo;