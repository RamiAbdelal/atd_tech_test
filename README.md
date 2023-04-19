# Attraction Tickets Tech Test
#### Product Search with Symfony and React

## Setup
1. Ensure Git is installed `sudo apt-get install git` and clone this repository: `git clone https://github.com/RamiAbdelal/atd_tech_test.git`
2. Ensure PHP 8+ is installed `sudo apt-get install php8.1` and also install the SimpleXML extension `sudo apt-get install php8.1-xml`
3. Install [Symfony CLI](https://symfony.com/download) `wget https://get.symfony.com/cli/installer -O - | bash`
4. Follow the installation script's output instruction to install it globally or add it to your $PATH
5. Run `symfony check:requirements` to confirm whether your system is ready to run Symfony
6. Ensure Composer is installed `sudo apt-get install composer`
7. Ensure Node.js is installed, ideally using [NVM](https://github.com/nvm-sh/nvm) `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`. If you've installed NVM, use version 16 `nvm install 16`, and if you were using a different version, run `nvm use 16`
8. Install PHP dependencies using Composer `composer install`
9. Install JS dependencies using npm `npm install`
10. Build JS and CSS `npm run build`
11. Serve the app locally using `symfony server:start` and visit [http://127.0.0.1:8001/search](http://127.0.0.1:8001/search)
12. Optionally dismiss the Symfony development toolbar on the bottom of the page to interact with the UI that toggles between the Symfony and React product search solutions
