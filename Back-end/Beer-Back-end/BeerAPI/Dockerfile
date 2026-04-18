FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["Beer-Back-end.sln", "./"]
COPY ["BeerAPI/BeerAPI.csproj", "BeerAPI/"]
COPY ["BeerLogic/BeerLogic.csproj", "BeerLogic/"]
COPY ["BeerData/BeerData.csproj", "BeerData/"]

RUN dotnet restore "Beer-Back-end.sln"

COPY . .

WORKDIR /src/BeerAPI
RUN dotnet publish "BeerAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "BeerAPI.dll"]