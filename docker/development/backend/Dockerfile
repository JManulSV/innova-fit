FROM php:8.2

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        pgsql \
        bcmath \
        zip \
        exif \
        pcntl

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

CMD sh -c "composer install && php artisan key:generate --force && php artisan serve --host=0.0.0.0 --port=8000"