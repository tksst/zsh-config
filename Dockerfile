# syntax=docker/dockerfile:1.2.1
FROM debian:bullseye-20220418-slim

RUN mkdir -p /work/opt/tksst/zsh/ /work/DEBIAN /results

COPY --chmod=644 prompt/prompt_tksst_setup /work/opt/tksst/zsh/
COPY prompt/control /work/DEBIAN/

RUN dpkg-deb --build /work /results/
