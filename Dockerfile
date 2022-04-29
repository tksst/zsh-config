# syntax=docker/dockerfile:1.2.1
FROM debian:bullseye-20220418-slim

RUN mkdir -p /work/opt/tksst/zsh/ /work/DEBIAN /results

COPY --chmod=644 files/ /work/opt/tksst/zsh
COPY control /work/DEBIAN/

RUN dpkg-deb --build /work /results/
