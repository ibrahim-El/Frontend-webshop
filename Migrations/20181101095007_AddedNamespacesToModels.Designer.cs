﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace kamerplantModel.Migrations
{
    [DbContext(typeof(kamerplantContext))]
    [Migration("20181101095007_AddedNamespacesToModels")]
    partial class AddedNamespacesToModels
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("bestelling_model.bestelling", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("klantID");

                    b.Property<double>("prijs");

                    b.HasKey("ID");

                    b.ToTable("bestelling");
                });

            modelBuilder.Entity("bestellingproduct_model.bestellingproduct", b =>
                {
                    b.Property<int>("bestellingID");

                    b.Property<int>("productID");

                    b.Property<int?>("klantID");

                    b.HasKey("bestellingID", "productID");

                    b.HasIndex("klantID");

                    b.HasIndex("productID");

                    b.ToTable("bestellingproduct");
                });

            modelBuilder.Entity("categorie_model.categorie", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("beschrijving");

                    b.Property<string>("foto");

                    b.Property<string>("naam");

                    b.Property<string>("url");

                    b.HasKey("ID");

                    b.ToTable("categorie");
                });

            modelBuilder.Entity("klant_model.klant", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("adres");

                    b.Property<string>("naam");

                    b.HasKey("ID");

                    b.ToTable("klant");

                    b.HasDiscriminator<string>("Discriminator").HasValue("klant");
                });

            modelBuilder.Entity("mandje_model.mandje", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("klantID");

                    b.HasKey("ID");

                    b.ToTable("mandje");
                });

            modelBuilder.Entity("product_model.product", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("beschrijving");

                    b.Property<int>("categorieID");

                    b.Property<string>("foto");

                    b.Property<string>("naam");

                    b.Property<double>("prijs");

                    b.Property<string>("url");

                    b.Property<int>("voorraad");

                    b.HasKey("ID");

                    b.HasIndex("categorieID");

                    b.ToTable("product");
                });

            modelBuilder.Entity("productmandje_model.productmandje", b =>
                {
                    b.Property<int>("productID");

                    b.Property<int>("mandjeID");

                    b.HasKey("productID", "mandjeID");

                    b.HasIndex("mandjeID");

                    b.ToTable("productmandje");
                });

            modelBuilder.Entity("verlanglijstitem_model.verlanglijstitem", b =>
                {
                    b.Property<int>("productID");

                    b.Property<int>("geregistreerdeklantID");

                    b.HasKey("productID", "geregistreerdeklantID");

                    b.HasIndex("geregistreerdeklantID");

                    b.ToTable("verlanglijstitem");
                });

            modelBuilder.Entity("geregistreerdeklant_model.geregistreerdeklant", b =>
                {
                    b.HasBaseType("klant_model.klant");

                    b.Property<string>("email");

                    b.ToTable("geregistreerdeklant");

                    b.HasDiscriminator().HasValue("geregistreerdeklant");
                });

            modelBuilder.Entity("bestellingproduct_model.bestellingproduct", b =>
                {
                    b.HasOne("bestelling_model.bestelling", "bestelling")
                        .WithMany("producten")
                        .HasForeignKey("bestellingID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("klant_model.klant")
                        .WithMany("bestellingen")
                        .HasForeignKey("klantID");

                    b.HasOne("product_model.product", "product")
                        .WithMany("bestellingen")
                        .HasForeignKey("productID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("product_model.product", b =>
                {
                    b.HasOne("categorie_model.categorie")
                        .WithMany("producten")
                        .HasForeignKey("categorieID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("productmandje_model.productmandje", b =>
                {
                    b.HasOne("mandje_model.mandje", "mandje")
                        .WithMany("producten")
                        .HasForeignKey("mandjeID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("product_model.product", "product")
                        .WithMany("mandjes")
                        .HasForeignKey("productID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("verlanglijstitem_model.verlanglijstitem", b =>
                {
                    b.HasOne("geregistreerdeklant_model.geregistreerdeklant", "geregistreerdeklant")
                        .WithMany("verlanglijst")
                        .HasForeignKey("geregistreerdeklantID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("product_model.product", "product")
                        .WithMany("verlanglijst")
                        .HasForeignKey("productID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
